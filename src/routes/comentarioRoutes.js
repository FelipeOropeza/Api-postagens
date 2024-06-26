import express from "express";
import ComentarioController from "../controller/comentarioController.js";

const routes = express.Router();

routes.get("/comentario", ComentarioController.listarComentarios);
routes.post("/comentario", ComentarioController.insertComentario);

export default routes;