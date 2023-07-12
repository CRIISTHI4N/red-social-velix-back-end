import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    user: {
        type: String,
        require: true,
        trim: true,
    },
    fullName: {
        type: String,
        require: true,
        trim: true,
    }
}, {
    timestamps: true
})

const Usuario = mongoose.model("Usuario", UsuarioSchema)
export default Usuario