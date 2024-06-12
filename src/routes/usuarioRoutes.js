import express from "express";
import UsuarioController from "../controller/usuarioController.js";

const routes = express.Router();

routes.get("/usuario", UsuarioController.listarUsuario);
routes.post("/usuario", UsuarioController.insertUsuario);
routes.put("/usuario/:id", UsuarioController.updateUsuario);
routes.delete("/usuario/:id", UsuarioController.delatarUsuario);

export default routes;