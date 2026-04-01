import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const image = (req, res) => {
    try {
        let { image } = req.params;

        let ruta = path.join(__dirname, "../upload/", image);

        res.sendFile(ruta);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar leet la imagen"});
    }

}

export default {
    image
}