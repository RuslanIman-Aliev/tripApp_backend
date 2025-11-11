/* eslint-disable import/first */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });
console.log("Loaded AI_KEY:", process.env.AI_KEY);
console.log("Loaded DATABASE:", process.env.DATABASE);

// eslint-disable-next-line import/extensions
import app from "./app.js";

const port = 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));
const server = app.listen(port, () => {
  console.log("App running");
});
