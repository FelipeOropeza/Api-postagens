import express from "express";
import LikeController from "../controller/likeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/like/:postId", authMiddleware, LikeController.insertLike);
routes.get("/post/:postId/likes", LikeController.getAllLike);

export default routes;
