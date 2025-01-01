import { Router } from "express";
const router = Router();

router.post("/:postId/likes", (req, res) => {
  const { postId } = req.params;
  res.send(`게시물 좋아요: ${postId}`);
});

router.delete("/:postId/likes", (req, res) => {
  const { postId } = req.params;
  res.send(`게시물 좋아요 취소: ${postId}`);
});

export default router;
