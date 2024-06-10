import express from "express";
import usuario from "./usuarioRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Api Postagens"));
  app.use(express.json(), usuario);
};

export default routes;