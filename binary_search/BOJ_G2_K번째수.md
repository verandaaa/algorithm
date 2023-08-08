# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [k] = input[1].split(" ").map(Number);
//<------------input

let answer = 0;

let left = 1;
let right = n * n;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += Math.min(Math.floor(mid / i), n);
  }
  if (count >= k) {
    answer = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);

~~~

이분탐색은 거꾸로 생각해보는거야  
정석으로 정답을 구하기 너무 어려워 보일때(k번째 수는 x이다)  
먼저 정답을 찍고 조건을 만족하는지 확인하는게 쉽다(x는 k번째 수이다)  
  
배열이 3x3이고 처음 x가 (9+1)/2=5일때  
1 2 3 -> 1의 배수 (3개)  
2 4 6 -> 2의 배수 (2개)  
3 6 9 -> 3의 배수 (1개)  
기본적으로 각 행에서 5이하 수를 구하려면 5/i을 하면 된다  
다만 최대 개수는 n을 넘지 못하므로  
count += Math.min(Math.floor(mid / i), n); 이렇게 개수를 구한다  
  
x가 7일때 count=8  
x가 6일때 count=8  
x가 5일때 count=6  
count를 셀때 x이하의 수를 세었으므로 7,8번째 수가 6임을 알 수 있다  
따라서 count>=k를 만족하므로 answer을 갱신한다  
count를 셀때 x이하의 수를 세었으므로 x가 다른데 count가 동일한 경우는 큰 x값(7)은 존재하지 않는다  
