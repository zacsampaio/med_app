import express from 'express';
import AuthController from '../../routes/AuthController.js';



const authRoutes  = express.Router();

//Rotas publicas - relacionadas  à autenticação e registro
authRoutes.post('/login', AuthController.login);
authRoutes.post('/register/doctor', AuthController.registerDoctor)

export default authRoutes ;