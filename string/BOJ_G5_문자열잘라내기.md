https://www.acmicpc.net/problem/2866

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n);
//<------------input
let answer = 0;

//m개의 문자열 저장
let list = new Array(m).fill().map(() => "");
for (let j = 0; j < m; j++) {
  for (let i = 0; i < n; i++) {
    list[j] += map[i][j];
  }
}

//앞 칸을 한칸씩 줄이면서 문자열이 중복되는지 확인
let set = new Set();
loop: for (let i = 1; i < n; i++) {
  for (let string of list) {
    let str = string.substring(i, n);

    if (set.has(str)) {
      break loop;
    }
    set.add(str);
  }
  answer++;
}

console.log(answer);

~~~
