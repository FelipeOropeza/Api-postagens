import cors from "cors";
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(cors({
    origin: 'https://dica-comunity-dtf1qeogs-felipeoropezas-projects.vercel.app',
  }));
routes(app);

export default app;