import express from 'express';
import pkg from "body-parser";
import cors from "cors";
import db from './database/database.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import privateRoutes from './routes/router.js';
import authRoutes from './routes/auth/authRoutes.js';



dotenv.config();

const app = express();
const { json, urlencoded} = pkg;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());

//Rotas públicas
app.use("/auth", authRoutes);

//Rotas privadas
app.use("/api", privateRoutes);


db.once("open", function () {
  console.log("Database connected successfully!");
  app.listen(3001, '0.0.0.0', () => {
    console.log("Listening to port 3001");
  });
});