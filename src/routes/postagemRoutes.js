import express from "express";
import PostagemController from "../controller/postagemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/postagem", PostagemController.listarPostagens);
routes.get("/postagem/slug/:slug", PostagemController.getByPostagem);
routes.get("/postagem/minhas-postagens/:id", authMiddleware, PostagemController.getMyPosts);
routes.post("/postagem", authMiddleware, PostagemController.insertPostagem);
routes.put("/postagem/:id", authMiddleware, PostagemController.updatePostagem);
routes.delete("/postagem/:id", authMiddleware, PostagemController.deletarPostagem);

export default routes;
