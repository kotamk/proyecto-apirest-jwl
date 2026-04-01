import express from 'express';
import carritoController from '../controllers/carrito.controller.js';
import jwtVerifyApi from '../auth/verify_token_api.js';

const router = express.Router();

router.get("/cantidad/:id_usuario", jwtVerifyApi, carritoController.cantidad);

//AGREGAR PRODUCTOS AL CARRITO
router.post("/add/:id_usuario/:id_producto", jwtVerifyApi, carritoController.addProduct);

//ELIMINAR PRODUCTOS DEL CARRITO
router.delete("/:id", jwtVerifyApi, carritoController.deleteProduct);

export default router;

