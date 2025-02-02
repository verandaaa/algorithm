https://www.acmicpc.net/problem/2847

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = 0;

let max = arr[n - 1];

for (let i = n - 1; i >= 0; i--) {
  //현재 라운드의 최대 점수를 넘거나 같아서 1만 깎아야 하는 경우 (5,5,5) (1,2,3)
  if (arr[i] >= max) {
    answer += arr[i] - max;
    max -= 1;
  }
  //현재 라운드의 최대 점수보다 작아서 깎지 않는 경우 (1,2,4)
  else {
    max = arr[i] - 1;
  }
}

console.log(answer);

~~~
