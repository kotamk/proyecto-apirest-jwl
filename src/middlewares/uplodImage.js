import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const uploadImage = (req, res, next) => {
    try {
        const extensionesPermitidas = ['webp', 'jpeg'];

        let { avatar } = req.files;
        
        let [tipo, extension] = avatar.mimetype.split("/");

        if(tipo != "image" || !extensionesPermitidas.includes(extension)){
            return res.status(400).json({message: `Formato de archivo no permitido, sólo se permiten imágenes en formatos: [${extensionesPermitidas.join(" - ")}]`});
        }
        let idImagen = uuidv4().slice(0,6);
        let nombreImagen = `IMG_${idImagen}.${extension}`;


        let rutaImagen = path.join(__dirname, "../upload/", nombreImagen);

        req.pathAvatar = rutaImagen;
        req.nombreImagen = nombreImagen;

        avatar.mv(rutaImagen, (error) => {

            if(error) throw new Error("Error al cargar la imagen");

            next();
        
        });

    } catch (error) {
        res.status(500).json({message: "Error al intentar subir la imagen, vuelva a intentar."});
    }

};

export default uploadImage;