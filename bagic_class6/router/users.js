import { Router } from "express";
const router = Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`프로필 조회: ${userId}`);
});

router.patch("/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`프로필 수정: ${userId}`);
});

router.post("/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`회원 탈퇴: ${userId}`);
});

export default router;
