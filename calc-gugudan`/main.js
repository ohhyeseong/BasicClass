// 필요한 모듈을 불러옵니다.
import readlineSync from "readline-sync";

// 프로그램 시작
function main() {
  // 사용자로부터 입력을 받습니다.
  const choice = readlineSync.question(
    "1. 사칙연산 계산기, 2. 구구단 출력기 (2~9단): "
  );
  // 입력에 따라 해당 기능을 실행합니다.
  console.log(`당신의 선택은: ${choice}`);
  if (choice === "1") {
    rulecalculator();
  } else if (choice === "2") {
    gugudan();
  } else {
    console.log("잘못된 선택입니다.");
  }
}

// 사칙연산 계산기 함수

function rulecalculator() {
  // 여기에 코드를 작성하세요.
  const num1 = parseFloat(readlineSync.question("첫 번째 숫자를 입력하세요: "));
  const num2 = parseFloat(readlineSync.question("두 번째 숫자를 입력하세요: "));
  const add = readlineSync.question(`필요한걸 입력하세요 ( + , - , * , /): `);
    

  let calculate;

  switch (add) {
    case "+":
      calculate = num1+num2;
      break;
    case "-":
      calculate = num1-num2;
      break;
    case "*":
      calculate = num1*num2;
      break;
    case "/":
      if (num2 === 0) {
        console.log("0으로 계산이 안됩니다.");
        return;
      }
      calculate = num1/num2;
      break;
      default:
      console.log("잘못된 계산 입니다.");
      return;
  }

  console.log(`결과: ${calculate}`);
}

// 구구단 출력 함수
function gugudan() {
  // 여기에 코드를 작성하세요.
  const dan = parseFloat(readlineSync.question("(2 ~ 9) 구구단을 보고 싶은 숫자를 입력해주세요 : "));

  if (dan < 2 || dan > 9) {
    console.log("잘못 입력되었습니다 2에서 9 사이의 숫자를 입력하세요");
    return;
  };
  console.log(`${dan}단:`);
  for (let i = 0; i <= 9; i++) {
    console.log(`${dan} X ${i} = ${dan * i}`);
  }
}

// 프로그램 실행
main();
