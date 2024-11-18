// [함수 연습 문제]

// 문제 1: 두 숫자를 더하는 함수를 작성하고 결과를 출력하세요.
let num1 = 3;
let num2 = 2;
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum(num1, num2));

// 문제 2: 이름을 매개변수로 받아서 "안녕하세요, [이름]님!"을 출력하는 함수를 작성하세요.
function person(name) {
  console.log(`안녕하세요 ${name} 님!`);
}
person("오혜성");
// 문제 3: 세 개의 숫자 중 가장 큰 수를 반환하는 함수를 작성하세요.
function bignum(a, b, c) {
  return Math.max(a, b, c);
}
let abc = bignum(10, 20, 3);
console.log(abc);
// 문제 4: 숫자를 매개변수로 받아 짝수인지 홀수인지 반환하는 함수를 작성하세요.
function number(num) {
  if (typeof num !== `number`) {
    return console.log("입력값은 숫자여야 합니다.");
  } else if (num % 2 === 0) {
    return console.log("짝수");
  } else {
    return console.log("홀수");
  }
}
number(2);
// 문제 5: 배열을 매개변수로 받아 모든 요소를 출력하는 함수를 작성하세요.
function hoho(abc) {
  for (let i = 0; i < abc.length; i++) {
    console.log(abc[i]);
  }
}
hoho(['바나나', '오렌지', '수박']);