import express from "express";
import usuario from "./usuarioRoutes.js";
import postagem from "./postagemRoutes.js"

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Api Postagens"));
  app.use(express.json(), usuario, postagem);
};

export default routes;