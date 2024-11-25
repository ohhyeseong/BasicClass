const arr = [1, 2, 3, 4, 5];
let ohs = arr.reduce(function (prev, next) {
    return prev + next * 2;
}, + 0);
console.log(ohs);
// reduce를 이용하여 arr의 모든 값에 곱하기 2를 한 값의 총합을 구하기.