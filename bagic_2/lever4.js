const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  
  // myFilter 를 구현하여 arr.filter 와 동일한 값이 나오도록 하기.
  function myFilter(arr, callback) {
    // ooo에 배열 선언
    let ooo = [];
    // myFilter 구현
    //             0 < 3;          [1]
    //             1 < 3;          [2]
    //             2 < 3;          [3]         
    for(let i = 0; i < arr.length; i++) {
        
        //                    [0]
        //ohs.name === 'banana'(arr[i]);
       if(callback(arr[i])) {
        // arr[i]에 배열을 추가
        ooo.push(arr[i]);
       }
      
    }
    // 배열 추가된거 배출
    return ooo;
  }
  let add = objArray.filter(function(ohs){
    return ohs.name === 'banana';
  })
  let add2 = myFilter(objArray,function(ohs){
    return ohs.name === 'banana';
  })
  console.log(add); //[ { name: 'banana', price: 200}]
  console.log(add2); //[ { name: 'banana', price: 200}]
  console.log(add === add2); // true 가 나와야 하는데 자꾸 false 가 나옴 진짜 머리아파 죽겠다