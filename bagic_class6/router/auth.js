import { Router } from "express";
const router = Router();

// 회원가입
router.post("/signup", (req, res) => {
  res.send("회원가입 엔드포인트");
});

// 로그인
router.post("/login", (req, res) => {
  res.send("로그인 엔드포인트");
});

// 로그아웃
router.post("/logout", (req, res) => {
  res.send("로그아웃 엔드포인트");
});

export default router;
