https://www.acmicpc.net/problem/5557

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let save = Array.from(Array(21), () => BigInt(0));
save[arr[0]] = BigInt(1);
let cur;

//BFS 느낌? 점점 뻗어나가는...
for (let i = 1; i < n - 1; i++) {
  //한개씩 추가 하면서
  cur = Array.from(Array(21), () => BigInt(0));
  for (let j = 0; j < 21; j++) {
    //0~20의 개수에 마킹
    if (save[j] > 0) {
      let a = j + arr[i];
      let b = j - arr[i];
      if (a >= 0 && a < 21) {
        cur[a] += save[j];
      }
      if (b >= 0 && b < 21) {
        cur[b] += save[j];
      }
    }
  }
  save = cur;
}
answer = save[arr[n - 1]].toString();

console.log(answer);

~~~

BigInt 사용해야 하는 문제  
마지막에 toString() 필요함  
