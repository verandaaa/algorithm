https://www.acmicpc.net/problem/3079

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer;

//최대 값 : 가장 시간이 적게 걸리는 창구 1개에서 모든 인원을 상대하는 것
let left = BigInt(0);
let right = BigInt(Math.min(...arr) * m);

while (left <= right) {
  let mid = (left + right) / BigInt(2);

  let sum = BigInt(0);
  for (let x of arr) {
    sum += mid / BigInt(x);
  }
  if (sum >= m) {
    answer = mid;
    right = mid - BigInt(1);
  } //
  else {
    left = mid + BigInt(1);
  }
}

console.log(answer.toString());

~~~

x/t1 + ... + x/tk = m 을 만족하는 최소의 x를 찾기 위해 이분탐색을 한다.  
right는 최대 10억x10억 = 10^18의 값을 가지므로 이분탐색에서 log₂(10^18) => log₂(2^60) = 약 60.  
arr의 길이가 최대 10만이므로, 시간복잡도를 넘지 않는다.  
또한 최대값이 2^53이상이므로, BigInt를 써야한다.  
