https://www.acmicpc.net/problem/9019

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = [
  ["D", doD],
  ["S", doS],
  ["L", doL],
  ["R", doR],
];

for (let [a, b] of arr) {
  let visit = new Array(10000).fill(null);
  visit[a] = ["", -1];
  let queue = [a];
  loop: while (queue.length) {
    let x = queue.shift();

    //D,S,L,R 명령에 대해서 새로운 수를 만든다
    for (let i = 0; i < 4; i++) {
      let f = list[i][1];
      let nx = f(x);
      //아직 도달하지 않은 수라면
      if (visit[nx] === null) {
        queue.push(nx);
        visit[nx] = [list[i][0], x]; //이번 명령, 이전 수
      }
      //목표 수 되었다
      if (nx === b) {
        break loop;
      }
    }
  }
  //마지막 수 b로부터 a로 되돌아간다
  let opts = [];
  let cur = b;
  while (cur !== a) {
    let [opt, prev] = visit[cur];
    opts.push(opt);
    cur = prev;
  }
  answer += opts.reverse().join("") + "\n";
}

function doD(x) {
  return (x * 2) % 10000;
}

function doS(x) {
  return (x + 9999) % 10000;
}

function doL(x) {
  return (x % 1000) * 10 + Math.floor(x / 1000);
}

function doR(x) {
  return 1000 * (x % 10) + Math.floor(x / 10);
}

console.log(answer);

~~~
