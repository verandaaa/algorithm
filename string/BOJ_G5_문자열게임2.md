https://www.acmicpc.net/problem/20437

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

for (let tc = 0; tc < n; tc++) {
  let string = input[1 + tc * 2];
  let m = input[1 + tc * 2 + 1] * 1;

  //각 문자별 위치 저장
  let check = Array.from(Array(26), () => []);
  for (let i = 0; i < string.length; i++) {
    check[string[i].charCodeAt(0) - 97].push(i);
  }

  let min = Infinity;
  let max = 0;
  for (let i = 0; i < 26; i++) {
    if (check[i].length < m) {
      continue;
    }
    //슬라이딩 윈도우
    for (let j = 0; j < check[i].length - m + 1; j++) {
      min = Math.min(min, check[i][j + m - 1] - check[i][j] + 1);
      max = Math.max(max, check[i][j + m - 1] - check[i][j] + 1);
    }
  }
  if (min === Infinity && max === 0) {
    answer += -1 + "\n";
  } else {
    answer += min + " " + max + "\n";
  }
}

console.log(answer);

~~~
