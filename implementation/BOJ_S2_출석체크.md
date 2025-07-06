https://www.acmicpc.net/problem/20438
# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k, q, m] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
let arr3 = input.slice(3, 3 + m).map((v) => v.split(" ").map(Number));

//<------------input
let answer = "";

// 0:졸지 않음, 1:졸고 있음, 2:출석 코드를 받음
let check = new Array(n + 3).fill(0);
for (let x of arr1) {
  check[x] = 1;
}
for (let x of arr2) {
  //보낼 수 없다
  //졸고 있는 학생은 pass, 이미 받은 학생도 pass
  if (check[x] > 0) {
    continue;
  }
  //코드 전송하기
  for (let i = x; i < n + 3; i += x) {
    //받을 수 없다
    //졸고 있는 학생은 pass
    if (check[i] === 1) {
      continue;
    }
    check[i] = 2;
  }
}

let sum = new Array(n + 3).fill(0);
for (let i = 1; i < n + 3; i++) {
  sum[i] += sum[i - 1] + (check[i] !== 2 ? 1 : 0);
}

for (let [s, e] of arr3) {
  answer += sum[e] - sum[s - 1] + "\n";
}

console.log(answer);

~~~
