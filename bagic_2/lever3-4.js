const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  let add = objArray.map(function(ohs){
    return ohs.price;
  })
  console.log(add);
  // map을 이용하여 price값만 모아둔 배열 만들기