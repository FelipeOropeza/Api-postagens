import express from "express";
import authController from "../controller/authController.js";

const routes = express.Router();

routes.post("/auth/login", authController.login);

export default routes;