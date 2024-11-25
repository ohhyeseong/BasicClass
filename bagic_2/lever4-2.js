const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  
  // myMap를 구현하여 arr.map과 동일한 값이 나오도록 하기.
  function myMap(arr, callback) {
    // ooo에 똑같이 배열 선언
    let ooo = [];
    // myMap 구현
    //             0 < 3;          0++
    //             1 < 3;          1++
    //             2 < 3;          
    for(let i = 0; i < arr.length; i++) {
    // 만약 qii.name(arr[0], 0, arr)이 
    // 참이면 ooo.push(arr[i], i, arr)배열을 넣는다.
        if(callback(arr[i], i, arr)) {
        ooo.push(callback(arr[i], i, arr));
        }
    }
// ooo을 배출한다.
   return ooo;
  }
  let ohs1 = objArray.map(function(qii){
    return qii.name;
  })
  let ohs2 = myMap(objArray,function(qii){
    return qii.name;
  })
  console.log(ohs1); // ['apple', 'banana', 'grape']
  console.log(ohs2); // ['apple', 'banana', 'grape']
  console.log(ohs1 === ohs2);// 너까지 왜그래... 이건 튜터님께 다시 물어보자