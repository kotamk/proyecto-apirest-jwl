import express from 'express';
import ventasController from '../controllers/ventas.controller.js';
import jwtVerifyApi from '../auth/verify_token_api.js';

const router = express.Router();

router.post("/:id_usuario", jwtVerifyApi, ventasController.create);

export default router;

