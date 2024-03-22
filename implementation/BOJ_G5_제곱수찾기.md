https://www.acmicpc.net/problem/1025

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split("").map(Number));
//<------------input
let answer = -1;

//시작 위치
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    //대각선 4방향 기준으로 몇칸 뛰어넘을지
    for (let r = -n; r <= n; r++) {
      for (let c = -m; c <= m; c++) {
        //둘다 0칸씩 이동하는 경우는 없다
        if (r === 0 && c === 0) {
          continue;
        }
        //수열을 만들기
        let cur = [];
        let x = i;
        let y = j;
        while (x >= 0 && x < n && y >= 0 && y < m) {
          cur.push(arr[x][y]);
          x += r;
          y += c;
          //하나씩 늘리는 와중에 수가 제곱수인지 판별
          let s = cur.join("") * 1;
          if (Math.sqrt(s) % 1 === 0) {
            answer = Math.max(answer, s);
          }
        }
      }
    }
  }
}

console.log(answer);

~~~
