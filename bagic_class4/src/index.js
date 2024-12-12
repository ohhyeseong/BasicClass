
import express from "express";

const app = express();
const port = 3000;

// 인메모리 데이터베이스
const players = [
  { id: 1, name: "차범근", speed: 100, shouting: 100, grade: "S" },
  { id: 2, name: "메시", speed: 100, shouting: 100, grade: "S" },
  { id: 3, name: "호날두", speed: 100, shouting: 100, grade: "S" },
  { id: 4, name: "박지성", speed: 100, shouting: 100, grade: "S" },
  { id: 5, name: "손흥민", speed: 100, shouting: 100, grade: "S" },
];

app.use(express.json());

// 모든 선수 조회 하는 로직 get 사용하기
app.get("/api/players", (req, res) => {
  res.status(200).json(players);
});

// 선수 추가 하는 로직 post사용하기
app.post("/api/players", (req, res) => {
  const newPlayer = {
    id: players.length + 1,
    name: req.body.name,
    speed: req.body.speed,
    shouting: req.body.shouting,
    grade: req.body.grade,
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

// 선수 수정 (일부분만 조정하는거기 때문에 put사용하기)
app.put("/api/players/:id", (req, res) => {
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player)
    return res.status(404).json({ message: "선수를 찾을 수 없습니다." });

  player.name = req.body.name;
  player.speed = req.body.speed;
  player.shouting = req.body.shouting;
  player.grade = req.body.grade;
  res.status(200).json(player);
});

// 선수 삭제  delete 사용하기
app.delete("/api/players/:id", (req, res) => {
  const playerIndex = players.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (playerIndex === -1)
    return res.status(404).json({ message: "선수를 찾을 수 없습니다." });

  players.splice(playerIndex, 1);
  res.status(204).send();
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ${port} 실행중!!`);
});
