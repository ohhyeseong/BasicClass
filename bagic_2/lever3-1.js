const objArray = [
    { name: 'apple', price: 100 }, // 0
    { name: 'banana', price: 200 },// 1
    { name: 'grape', price: 300 },// 2
  ]
  
  // myFind 를 구현하여 arr.find 와 동일한 값이 나오도록 하기.
  function myFind(arr, callback) {
    // callback의 결과가
    // ★true★가 되는 ★첫번째 요소★를 ★반환★
    // -> true이면 바로 반환
    for(let i = 0; i < arr.length; i++) {
    if(callback(arr[i])) {
        return arr[i];
    }
// obj.name === 'banana'(arr[i])
    }
  }
  
  const result1 = objArray.find(function (obj) {
    return obj.name === 'banana';
  });
  
  const result2 = myFind(objArray, function (obj) {
    return obj.name === 'banana';
  });
//   console.log(result1);
  console.log(result1);
  console.log(result2);
  console.log(result1 === result2); // true

  function test() {
    return 1;  
  }

  const a = test();