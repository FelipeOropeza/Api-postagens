import express from "express";
import PostagemController from "../controller/postagemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/postagem", PostagemController.listarPostagens);
routes.post("/postagem", authMiddleware, PostagemController.insertPostagem);
routes.put("/postagem/:id", authMiddleware, PostagemController.updatePostagem);
routes.delete("/postagem/:id", authMiddleware, PostagemController.deletarPostagem);

export default routes;
