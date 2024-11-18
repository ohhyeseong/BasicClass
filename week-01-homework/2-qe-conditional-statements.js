// [조건문 연습 문제]

// 문제 1: 숫자를 입력받아 짝수인지 홀수인지 출력하세요.
let i = 2;
if (i % 2 === 0) {
  console.log("짝수입니다.");
} else {
  console.log("홀수입니다.");
}
// 문제 2: 점수를 입력받아 학점을 출력하세요.
let score = 70;
if (score >= 90) {
  console.log("A학점 입니다.");
} else if (score >= 80) {
  console.log("B학점 입니다.");
} else if (score >= 70) {
  console.log("C학점 입니다.");
} else {
  console.log("D학점 입니다.");
}
// 90점 이상 A, 80점 이상 B, 70점 이상 C, 그 외 D

// 문제 3: 나이를 입력받아 성인인지 미성년자인지 출력하세요.
let age = 20;
if (age >= 20) {
  console.log("성인입니다.");
} else {
  console.log("미성년자 입니다.");
}
// 문제 4: switch문을 사용하여 요일을 출력하세요.
let day = 4;
switch (day) {
  case 1:
    console.log("월요일 입니다.");
    break;
  case 2:
    console.log("화요일 입니다.");
    break;
  case 3:
    console.log("수요일 입니다.");
    break;
  case 4:
    console.log("목요일 입니다.");
    break;
  case 5:
    console.log("금요일 입니다.");
    break;
  default:
    console.log("예시 4: 주말입니다.");
}
// 문제 5: 두 숫자를 비교하여 큰 수를 출력하세요.
// let num1 = 1;
// let num2 = 2;
function add(num1, num2) {
    if (num1 > num2) {
      console.log("큰 수는:", num1);
    } else if (num2 > num1) {
      console.log("큰 수는:", num2);
    } else {
      console.log("두 수는 같습니다.");
    }
  }
