const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  
  // myForEach 를 구현하여 arr.forEach 와 동일한 값이 나오도록 하기.
  function myForEach(arr, callback) {
    //     i = 0; 0 < 3;          0++ -> 1
    //            1 < 3;
   for(let i = 0; i < arr.length; i++) {
    // arr[0] = { name: 'apple', price: 100 }
    // arr[1] = { name: 'banana', price: 200 }
    callback(arr[i]);
   }
        
  }
  /**
  { name: 'apple', price: 100 }
  { name: 'banana', price: 200 }
  { name: 'grape', price: 300 }
   */
  myForEach(objArray, function (obj) {
    console.log(obj);
  });

  objArray.forEach(function (obj) {
    console.log(obj);
  });
  

  