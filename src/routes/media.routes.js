import express from 'express';
import mediaController from '../controllers/media.controller.js';


const router = express.Router();

router.get("/image/:image", mediaController.image);


export default router;

