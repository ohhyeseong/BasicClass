import express from "express";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/users.js";
import postRoutes from "./router/posts.js";
import commentRoutes from "./router/comments.js";
import likeRoutes from "./router/likes.js";
import uploadRoutes from "./router/uploads.js";

const app = express();

app.use(express.json());

// 라우터 연결
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/uploads", uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 열렸습니다.`);
});
