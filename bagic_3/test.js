class GameCharacter {
  constructor(name, level, stamina, str) {
    this.name = name;
    this.level = level;
    this.stamina = stamina;
    this.str = str;
  }
  attack() {
    console.log(`${this.str}의 힘으로 공격합니다!`);
  }
  heal() {
    console.log(`체력을 ${(this.stamina += 20)} 회복했습니다!`);
  }
  levelUp() {
    const level = Math.floor(Math.random() * 20);
    this.stamina += level;
    this.str += level;
    console.log(
      `축하합니다!레벨업 하셨습니다! 
      체력이 ${this.stamina} 에서 ${level} 올랐습니다!
      힘 이 ${this.str} 에서 ${level} 올랐습니다!`
    );
  }
}

const ohs1 = new GameCharacter("토벤머리전사", 1, 100, 30);
const ohs2 = new GameCharacter("zㅣ존검사", 1, 100, 15);
const ohs3 = new GameCharacter("닉넴뭘로하지", 1, 100, 60);

//ohs1 공격, 체력회복, 레벌업 실행메서드
console.log("ohs1의 상태");
ohs1.attack();
ohs1.heal();
ohs1.levelUp();

console.log("ohs2의 상태");
ohs2.attack();
ohs2.heal();
ohs2.levelUp();

console.log("ohs3의 상태");
ohs3.attack();
ohs3.heal();
ohs3.levelUp();

// ================== promise ========================

const openBox = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve("성공");
      } else {
        reject("실패");
      }
    }, 3000); // 3초 후에 결과 공개
  });

openBox()
  .then(() => {
    console.log("축하합니다! 황금 보물을 발견했습니다!");
  })
  .catch(() => {
    console.log("보물을 찾는 데 실패했습니다. 다시 시도하세요.");
  });

// promise

// 보물상자 여는 promise 함수 만들기
// 함수 이름은 findTreasure 로 하기
// 3초동안 보물을 찾는 작업을 시뮬레이션 하기
// 10%확률로 성공하고, 90%확률로 실패하기
// 성공 (resolve) 시 " 축하합니다! 황금 보물을 발견했습니다!" 메세지 반환
// 실패 ( reject) 시 "보물을 찾는 데 실패했습니다. 다시 시도하세요." 메세지 반환
// findTreasure를 호출한 뒤 then() 과 .catch()를 사용하여 성공과 실패 메시지를 출력
// then,catch를 try/catch, async/await로 변경해보기 (이건 필수는 아니고 도전 과제 스스로 공부해 보기)
