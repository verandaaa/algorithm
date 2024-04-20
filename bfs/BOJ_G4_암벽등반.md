https://www.acmicpc.net/problem/2412

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = -1;

let set = new Set();
//수학에서의 좌표를 알고리즘에서의 좌표로 변형시킨다
for (let [x, y] of arr) {
  let nx = m - y;
  let ny = x;
  set.add(nx + " " + ny);
}

let queue = [[m, 0, 0]]; //출발지
while (queue.length) {
  let [x, y, c] = queue.shift();

  //도착지
  if (x === 0) {
    answer = c;
    break;
  }

  //x,y의 절대값 2 거리 이내의 좌표에 대해서
  for (let k1 = -2; k1 <= 2; k1++) {
    for (let k2 = -2; k2 <= 2; k2++) {
      let nx = x + k1;
      let ny = y + k2;
      let pos = nx + " " + ny;
      //홈이 존재한다면
      if (set.has(pos)) {
        set.delete(pos);
        queue.push([nx, ny, c + 1]);
      }
    }
  }
}

console.log(answer);

~~~

