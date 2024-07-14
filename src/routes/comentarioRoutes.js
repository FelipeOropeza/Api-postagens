import express from "express";
import ComentarioController from "../controller/comentarioController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const routes = express.Router();

routes.get("/comentario", authMiddleware, ComentarioController.listarComentarios);
routes.post("/comentario", authMiddleware, ComentarioController.insertComentario);
routes.put("/comentario/:id", authMiddleware, ComentarioController.updateComentario);
routes.delete("/comentario/:id", authMiddleware, ComentarioController.deletarComentario);

export default routes;