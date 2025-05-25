import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/med-app");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

export default db;
