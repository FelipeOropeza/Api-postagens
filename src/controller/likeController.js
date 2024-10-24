import { getLikesCount, postLike } from "../services/likeService.js";

class LikeController {
  static async insertLike(req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
      const result = await postLike(postId, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllLike(req, res) {
    const { postId } = req.params;

    try {
      const likeCount = await getLikesCount(postId);
      res.status(200).json({ postId, likeCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default LikeController;
