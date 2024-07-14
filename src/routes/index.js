import express from "express";
import usuario from "./usuarioRoutes.js";
import postagem from "./postagemRoutes.js";
import comentario from "./comentarioRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Api Postagens"));
  app.use(express.json(), usuario, postagem, comentario, auth);
};

export default routes;