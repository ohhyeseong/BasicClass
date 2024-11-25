const objArray = [
  { name: 'apple', price: 100 },
  { name: 'banana', price: 200 },
  { name: 'grape', price: 300 },
]

// forEach를 이용하여 objArray의 name을 모두 출력
//objArray의 item의 함수를 하나씩 반복해라.
objArray.forEach(function (item) {
// item의 name을 출력해라 
  console.log(item.name);
})