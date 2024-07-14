import express from "express";
import UsuarioController from "../controller/usuarioController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/usuario",  UsuarioController.listarUsuario);
routes.post("/usuario", UsuarioController.insertUsuario);
routes.put("/usuario/:id", authMiddleware, UsuarioController.updateUsuario);
routes.delete("/usuario/:id", authMiddleware, UsuarioController.delatarUsuario);

export default routes;