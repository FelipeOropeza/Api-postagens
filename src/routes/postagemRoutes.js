import express from "express";
import PostagemController from "../controller/postagemController.js";

const routes = express.Router();

routes.get("/postagem", PostagemController.listarPostagens);
routes.post("/postagem", PostagemController.insertPostagem)

export default routes;