import express from "express";
import PostagemController from "../controller/postagemController.js";

const routes = express.Router();

routes.get("/postagem", PostagemController.listarPostagens);
routes.post("/postagem", PostagemController.insertPostagem);
routes.put("/postagem/:id", PostagemController.updatePostagem);
routes.delete("/postagem/:id", PostagemController.deletarPostagem);

export default routes;
