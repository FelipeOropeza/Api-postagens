import express from "express";
import UserController from "../controller/UserController.js";

const routes = express.Router();

routes.get("/users", UserController.listarUsers);

export default routes;