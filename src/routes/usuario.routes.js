import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import uploadImage from '../middlewares/uplodImage.js';
import jwtVerifyApi from '../auth/verify_token_api.js'


const router = express.Router();


//OBTENER TODOS LOS USUARIOS
router.get("/", usuarioController.findAll);

router.get("/:id", usuarioController.findById);


//RUTA PARA ACTUALIZAR EMAIL
router.patch("/email", jwtVerifyApi, usuarioController.changeEmail);

//CREAR USUARIOS
router.post("/", uploadImage, usuarioController.create);

router.post("/login", usuarioController.login);

//RUTA PARA ELIMINAR USUARIO

router.delete("/:id", usuarioController.deleteUser);




export default router;

