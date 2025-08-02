https://www.acmicpc.net/problem/14247

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
//<------------input
let answer = 0;

let arr = arr1.map((item, index) => [item, arr2[index]]);

arr.sort((a, b) => b[1] - a[1]);
for (let i = 0; i < n; i++) {
  answer += arr[i][0] + arr[i][1] * (n - 1 - i);
}

console.log(answer);

~~~

매일 매일 계산해서 현재 가장 긴 나무를 자르면 안되는가? -> 아니다  
n일 동안 n개의 나무를 자를 건데... 성장 속도가 압도적으로 큰 나무를 당장 자르지 않고 마지막까지 묵혀두어도 된다. 지금 자르나 내일 자르나 총량은 똑같다.  
따라서 매일 다른 나무를 자르는 것이 최대 이득이다.  
매일 다른 나무를 자르려고 한다면, 성장 속도 순으로 나무를 묵혀서 자르는 것이 최대 이익이 된다.  
