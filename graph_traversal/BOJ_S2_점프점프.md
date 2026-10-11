https://www.acmicpc.net/problem/14248

# Solution 1 - JavaScript
~~~javascript
const { deflateSync } = require("zlib");
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map((v) => v * 1);
let arr = input[1].split(" ").map((v) => v * 1);
let [s] = input[2].split(" ").map((v) => v * 1);

//<------------input
let answer = 1;

let queue = [s - 1];
let visited = Array.from(Array(n), () => false);
visited[s - 1] = true;

while (queue.length) {
  let q = queue.shift();

  //left
  let li = q - arr[q];
  if (li >= 0 && !visited[li]) {
    //왼쪽 가능성
    queue.push(li);
    visited[li] = true;
    answer++;
  }

  //right
  let ri = q + arr[q];
  if (ri < n && !visited[ri]) {
    //오른쪽 가능성
    queue.push(ri);
    visited[ri] = true;
    answer++;
  }
}

console.log(answer);

~~~
