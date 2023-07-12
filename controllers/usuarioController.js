import Usuario from "../models/Usuario.js"
import Pubicacion from "../models/Publicacion.js";

export const registro = async (req, res) => {
    const { email, user } = req.body

    const emailRegistrado = await Usuario.findOne({ email });
    const userRegistrado = await Usuario.findOne({ user });

    if (emailRegistrado) {
        const error = new Error("Email ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    if (userRegistrado) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = await new Usuario(req.body)
        await usuario.save()
        res.json({ msg: "Usuario registrado correctamente" })

    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {

    const { email, password } = req.body

    const verificarEmail = await Usuario.findOne({ email }).select("-email -password -createdAt -updatedAt -__v")
    const verificarPassword = await Usuario.findOne({ password })

    if (!verificarEmail) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    const error = new Error("Contraseña incorrecta")

    try {
        if (password !== verificarPassword.password) {
            return res.status(404).json({ msg: error.message })
        }
    } catch (e) {
        return res.status(404).json({ msg: error.message })
    }

    req.usuario = verificarEmail
    res.json(req.usuario)
}

export const inicio = (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export const obtenerPublicacion = async (req, res) => {
    const { id } = req.params

    const publicaciones = await Pubicacion.find({ user: id }).sort({ createdAt: -1 })

    res.json(publicaciones)
}

export const obtenerPublicaciones = async (req, res) => {

    const publicaciones = await Pubicacion.find({})
        .sort({ createdAt: -1 })
        .populate('user', 'user')
        .select("-user -updatedAt -__v")
    res.json(publicaciones)
}

export const publicacion = async (req, res) => {

    const { filename } = req.file

    const publicacion = new Pubicacion(req.body)

    publicacion.setImgUrl(filename)
    publicacion.save();
    res.json({ publicacion })
}

export const actualizarLikes = async (req, res) => {
    const { id } = req.params
    const { likes } = req.body

    const publicacion = await Pubicacion.findById(id).select('likes status')

    parseInt(likes)
        ? publicacion.likes = parseInt(publicacion.likes) + 1
        : publicacion.likes = parseInt(publicacion.likes) - 1

    publicacion.save();

    res.json(publicacion);
}