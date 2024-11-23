https://www.acmicpc.net/problem/1913

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [m] = input[1].split(" ").map(Number);
//<------------input
let answer = "";

let map = new Array(n).fill().map(() => new Array(n).fill(0));
let dx = [-1, 0, 1, 0];
let dy = [0, 1, 0, -1];

let [x, y] = [(n - 1) / 2, (n - 1) / 2];
answer = x + 1 + " " + (y + 1);
let s = 1;
map[x][y] = s;
let d = 0;
let count = 1;

loop: while (true) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < count; j++) {
      s++;
      x += dx[d];
      y += dy[d];
      map[x][y] = s;
      if (s === m) {
        answer = x + 1 + " " + (y + 1);
      }
      if (s === n * n) {
        break loop;
      }
    }
    d = (d + 1) % 4;
  }
  count++;
}

function getString() {
  return map.map((line) => line.join(" ")).join("\n");
}
answer = getString() + "\n" + answer;

console.log(answer);

~~~

중앙점을 시작으로해서  
상(1) 우(1) 하(2) 좌(2) 상(3) 우(3) 하(4) 좌(4)... 반복됨  
