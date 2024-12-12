import express from "express";
import player from "./router/player.router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use("/api", player);

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ${port} 실행중!!`);
});
