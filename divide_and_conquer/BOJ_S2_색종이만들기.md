https://www.acmicpc.net/problem/2630

# Solution 1 - JavaScript
~~~javascript
const { deflateSync } = require("zlib");

let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map((v) => v * 1);
let map = input
  .slice(1, input.length)
  .map((v) => v.split(" ").map((v2) => v2 * 1));

//<------------input
let answer = [0, 0];

dfs(0, 0, n);

function dfs(x, y, size) {
  let first = map[x][y];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (map[x + i][y + j] !== first) {
        //4조각으로 찢기는 조건
        let nsize = size / 2;
        dfs(x, y, nsize);
        dfs(x, y + nsize, nsize);
        dfs(x + nsize, y, nsize);
        dfs(x + nsize, y + nsize, nsize);
        return;
      }
    }
  }
  answer[first]++;
}
answer = answer.join("\n");

console.log(answer);

~~~
