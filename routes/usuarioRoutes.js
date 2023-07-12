import { Router } from "express";
import {
    login,
    registro,
    inicio,
    publicacion,
    obtenerPublicacion,
    obtenerPublicaciones,
    actualizarLikes
} from "../controllers/usuarioController.js";
import { upload } from "../libs/storage.js";

const router = Router();

router.post("/registro", registro)
router.post("/login", login)

router.post("/publicacion", upload.single('image'), publicacion)
router.get("/publicacion/:id", obtenerPublicacion)
router.put("/publicacion/:id", actualizarLikes)
router.get("/publicaciones", obtenerPublicaciones)
router.get("/inicio", inicio)

export default router