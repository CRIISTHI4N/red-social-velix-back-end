import mongoose from "mongoose"

const PublicacionSchema = mongoose.Schema({
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    imgUrl: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

PublicacionSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUrl = `${process.env.URL_HOST}:${process.env.URL_PORT}/public/${filename}`
}

const Pubicacion = mongoose.model("Publicacion", PublicacionSchema)
export default Pubicacion