import express from 'express';
import webController from '../controllers/web.controller.js';
import jwtVerifyView from '../auth/verify_token_views.js';

const router = express.Router();

router.get(["/", "/home", "/inicio"], webController.home);

//RUTAS DE USUARIOS
router.get("/usuarios", webController.usuarios);

router.get("/perfil/:id", jwtVerifyView, webController.perfil);

//RUTAS DE PRODUCTOS
router.get("/productos", webController.productos);

//RUTAS DE VENTAS
router.get("/ventas", webController.ventas);

//RUTAS DE CARRITO
router.get("/carrito/:id", webController.carrito);


router.get("/register", webController.register);
router.get("/login", webController.login);

export default router;

