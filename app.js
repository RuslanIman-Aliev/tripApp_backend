/* eslint-disable import/first */
/* eslint-disable import/extensions */

import express from "express";
// eslint-disable-next-line import/no-unresolved
import userRouter from "./routes/userRoutes.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import tripRouter from "./routes/tripRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);
app.use(globalErrorHandler);

export default app;
