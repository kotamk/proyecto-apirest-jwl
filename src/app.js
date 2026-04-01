import express from 'express';
import morgan from 'morgan';
import usuarioRoutes from './routes/usuario.routes.js';
import webRoutes from './routes/web.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
import mediaRoutes from './routes/media.routes.js';
import ventaRoutes from './routes/venta.routes.js';

import fileUpload from 'express-fileupload';

import { create } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from "url";


const app = express();

//MIDDLEWARES GENERAL
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(fileUpload());


//CONFIGURACIÓN HANDLEBARS
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hbs = create({
	partialsDir: [
		path.join(__dirname, "./views/partials/")
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));


//RUTAS APP WEB
app.use("/", webRoutes);


//RUTAS API

//API USUARIOS
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/carritos", carritoRoutes);
app.use("/api/ventas", ventaRoutes);

app.use("/media", mediaRoutes);

//EXPORTAR SERVIDOR
export default app;