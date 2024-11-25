const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
  ]
  let ohoh = objArray.findIndex(function (item) {
    return item.name === 'apple';
  })
  console.log(ohoh);
  // findIndex를 이용하여 name 이 apple 인 객체의 index 찾기