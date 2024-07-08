import express from "express";
import ComentarioController from "../controller/comentarioController.js";

const routes = express.Router();

routes.get("/comentario", ComentarioController.listarComentarios);
routes.post("/comentario", ComentarioController.insertComentario);
routes.put("/comentario/:id", ComentarioController.updateComentario);
routes.delete("/comentario/:id", ComentarioController.deletarComentario);

export default routes;