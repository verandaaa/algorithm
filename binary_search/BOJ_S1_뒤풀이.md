https://www.acmicpc.net/problem/14575

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let totalMin = 0;
let totalMax = 0;
let maxS = 0;
let maxE = 0;
for (let [s, e] of arr) {
  totalMin += s;
  totalMax += e;
  maxS = Math.max(maxS, s);
  maxE = Math.max(maxE, e);
}

//최소주량의 합이 m을 넘거나, 최대주량의 합이 m을 못넘는다면 값을 구할 수 없음.
if (totalMin > m || totalMax < m) {
  console.log(-1);
  return;
}

let rem = m - totalMin;
let left = maxS;
let right = maxE;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let sum = 0;
  //최소 주량을 뺀 나머지만큼을, 최대 주량을 넘지 않는 선에서 채울 수 있는가?
  for (let [s, e] of arr) {
    sum += Math.min(mid, e) - s;
  }
  if (sum >= rem) {
    right = mid - 1;
    answer = mid;
  } else {
    left = mid + 1;
  }
}

console.log(answer);

~~~
