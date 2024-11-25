const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  let odd = objArray.filter(function(add){
    return add.price >= 200;
  }) 
  console.log(odd);
  // filter 를 이용하여 price가 200 이상인 객체 filter