import express from 'express';
import pkg from "body-parser";
import router from "./routes/router.js";
import cors from "cors";
import db from './database/database.js';

const app = express();
const { json, urlencoded} = pkg;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
app.use("/", router);

db.once("open", function () {
  console.log("Database connected successfully!");
  app.listen(3001, '0.0.0.0', () => {
    console.log("Listening to port 3001");
  });
});