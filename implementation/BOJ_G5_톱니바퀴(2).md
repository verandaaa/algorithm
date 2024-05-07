https://www.acmicpc.net/problem/15662

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let wheels = input.slice(1, 1 + n);
let [m] = input[1 + n].split(" ").map(Number);
let orders = input.slice(2 + n, 2 + n + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//각 톱니바퀴의 12시
let top = new Array(n).fill(0);

for (let [cur, dir] of orders) {
  cur--;
  let [curLeft, curRight] = lr(cur);
  top[cur] = newTop(cur, 0, dir);

  //닿은 부분이 다를 때까지 왼쪽 방향으로 퍼지기
  for (let next = cur - 1; next >= 0; next--) {
    let [nextLeft, nextRight] = lr(next);
    if (curLeft === nextRight) {
      break;
    }
    curLeft = nextLeft;
    top[next] = newTop(next, cur - next, dir);
  }

  //닿은 부분이 다를 때까지 오른쪽 방향으로 퍼지기
  for (let next = cur + 1; next < n; next++) {
    let [nextLeft, nextRight] = lr(next);
    if (curRight === nextLeft) {
      break;
    }
    curRight = nextRight;
    top[next] = newTop(next, next - cur, dir);
  }
}

function newTop(index, distance, dir) {
  //무슨 방향으로 회전할 것인가?
  //돌리기 시작한곳으로부터 얼마나 떨어져있는지 알면 회전 방향을 알 수 있다
  return (top[index] + (-1) ** (distance + 1) * dir + 8) % 8;
}

function lr(index) {
  //12시에 어떤 톱니가 존재하는지 알고 있다
  //그 톱니를 기준으로 3시와 9시도 어떤 톱니인지 구할 수 있다
  let left = wheels[index][(top[index] + 6) % 8];
  let right = wheels[index][(top[index] + 2) % 8];

  return [left, right];
}

for (let i = 0; i < n; i++) {
  if (wheels[i][top[i]] === "1") {
    answer++;
  }
}

console.log(answer);

~~~
