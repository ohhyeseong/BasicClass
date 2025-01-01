import { Router } from "express";
const router = Router();

router.post("/:postId", (req, res) => {
  const { postId } = req.params;
  res.send(`댓글 작성: 게시물 ID ${postId}`);
});

router.patch("/:postId/comments", (req, res) => {
  const { postId, commentId } = req.params;
  res.send(`댓글 수정: 게시물 ID ${postId}, 댓글 ID ${commentId}`);
});

router.delete("/:postId/comments", (req, res) => {
  const { postId, commentId } = req.params;
  res.send(`댓글 삭제: 게시물 ID ${postId}, 댓글 ID ${commentId}`);
});

export default router;
