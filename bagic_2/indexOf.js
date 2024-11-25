// myIndexOf를 구현하여 arr.indexOf와 동일한 값이 나오도록 하기.
const test = [1, 2, 3, 4, 5];
function myIndexOf(arr, value) {
    //    1.         2.             4. 
    //             0 < 4;          1
    //             1 < 4;          2
    //             2 < 4;          3
    //             3 < 4;          4
    for(let i = 0; i < arr.length; i++) {
        // 3.     만약 false면 다시 for문으로 
        // arr[0] === 3    )
        // arr[1] === 3   
        // arr[2] === 3
        // arr[3] === 3  -> true -> return 해주기  
        if(arr[i] === value) {
          //만약 true 면 return 해서
            return i;
        }
    }
}

const index1 = test.indexOf(3); // 2
const index2 = myIndexOf(test, 3); // 2
console.log(index1 === index2); // true
console.log(index2);