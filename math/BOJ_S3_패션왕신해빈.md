https://www.acmicpc.net/problem/9375

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let index = 1;
for (let tc = 0; tc < n; tc++) {
  let m = Number(input[index]);

  //옷 타입에 따라 개수를 셈
  let map = new Map();
  for (let i = index + 1; i < index + 1 + m; i++) {
    let [_, type] = input[i].trim().split(" ");
    map.set(type, map.get(type) + 1 || 1);
  }
  //조합을 만든다
  let count = 1;
  for (let [_, value] of map) {
    //안입는 경우
    count *= value + 1;
  }
  //모든 옷을 안입는 경우는 제외
  count -= 1;
  answer += count + "\n";

  index += m + 1;
}

console.log(answer);

~~~
