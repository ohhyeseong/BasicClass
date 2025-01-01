import { Router } from "express";
const router = Router();

router.post("/users/:userId/profile-image", (req, res) => {
  const { userId } = req.params;
  res.send(`프로필 사진 업로드: ${userId}`);
});

router.post("/posts/:postId/image", (req, res) => {
  const { postId } = req.params;
  res.send(`게시물 이미지 업로드: ${postId}`);
});

export default router;
