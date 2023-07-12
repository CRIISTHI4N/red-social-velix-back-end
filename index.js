import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { conectarDB } from "./config/db.js"
import usuarioRouter from "./routes/usuarioRoutes.js"
import path from "path";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
dotenv.config()
app.use(express.json())
conectarDB();
app.use('/public/', express.static(`${__dirname}/storage/imgs`))


// Cors
// =================================================
const whiteList = [process.env.FRONT_END_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de cors"))
        }
    }
}
app.use(cors(corsOptions))
// =================================================


// Routing
app.use("/api/usuario", usuarioRouter)

// Obtencion de imagenes
app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '/storage/imgs/', filename);

    // Configura el encabezado de la respuesta para indicar el tipo de contenido
    res.setHeader('Content-Type', 'image/jpeg');

    // Lee el archivo y envía el contenido como respuesta
    fs.createReadStream(imagePath).pipe(res);
});

app.listen(process.env.URL_PORT, () => {
    console.log("Conectando...");
})