https://www.acmicpc.net/problem/3673

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

for (let tc = 0; tc < t; tc++) {
  let [d, n] = input[1 + tc * 2].split(" ").map(Number);
  let arr = input[1 + tc * 2 + 1].split(" ").map(Number);

  //누적합 구하기, d로 나누기, map에 개수 메모
  let sum = [0];
  let map = new Map();
  map.set(0, 1);
  for (let i = 0; i < n; i++) {
    let s = (sum[i] + arr[i]) % d;
    sum.push(s);
    map.set(s, map.get(s) + 1 || 1);
  }

  //값이 일치하는 구간의 개수
  let count = 0;
  for (let [key, value] of map) {
    count += (value * (value - 1)) / 2;
  }
  answer += count + "\n";
}

console.log(answer);

~~~

누적합 나머지가 일치한다 -> 끝 - 시작 = 0, 즉 구간합의 나머지가 0이라는 뜻  
