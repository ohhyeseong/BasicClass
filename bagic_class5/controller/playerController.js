import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// // 인메모리 데이터베이스
// const players = [
//   { id: 1, name: "차범근", speed: 100, shouting: 100, grade: "S" },
//   { id: 2, name: "메시", speed: 100, shouting: 100, grade: "S" },
//   { id: 3, name: "호날두", speed: 100, shouting: 100, grade: "S" },
//   { id: 4, name: "박지성", speed: 100, shouting: 100, grade: "S" },
//   { id: 5, name: "손흥민", speed: 100, shouting: 100, grade: "S" },
// ];

// 모든 선수 조회 하는 로직 get 사용하기
export const getPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "조회중 오류 발생" });
  }
};

// 선수 추가 하는 로직 post사용하기
export const createPlayer = async (req, res) => {
  const { name, speed, shouting, grade } = req.body;
  try {
    const newPlayer = await prisma.player.create({
      data: {
        name,
        speed,
        shouting,
        grade,
      },
    });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: "선수 추가 중 오류 발생" });
  }
};

// 선수 수정 (일부분만 조정하는거기 때문에 put사용하기)
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, speed, shouting, grade } = req.body;
  try {
    const player = await prisma.player.update({
      where: { id: parseInt(id) },
      data: { name, speed, shouting, grade },
    });
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: "선수를 찾을 수 없습니다." });
  }
};

// 선수 삭제  delete 사용하기
export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.player.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "성공적으로 삭제했습니다!" });
  } catch (error) {
    res.status(404).json({ message: "선수를 찾을 수 없습니다." });
  }
};
