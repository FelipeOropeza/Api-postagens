import express from "express";
import UsuarioController from "../controller/usuarioController.js";

const routes = express.Router();

routes.get("/usuario", UsuarioController.listarUsuario);
routes.post("/usuario", UsuarioController.insertUsuario);

export default routes;