https://www.acmicpc.net/problem/5904

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = "o";

let arr = [3];
let len = 3;
let k = 0;

//3,10,25... n을 처음 넘는 s(k)찾기
for (let i = 1; len < n; i++) {
  let next = arr[i - 1] * 2 + i + 3;
  arr.push(next);
  len = next;
  k = i;
}

while (n > 3) {
  //이전 길이 값을 뺀다
  if (n >= arr[k - 1]) {
    n -= arr[k - 1];

    //mo...o에 포함된다면 끝
    if (n <= k + 3) {
      break;
    }
    //아니라면 그만큼 빼고
    else {
      n -= k + 3;
    }
  }
  //k감소
  k--;
}

if (n === 1) {
  answer = "m";
}

console.log(answer);

/*
S(0) = "(m o o)" - 3
S(1) = "(m o o) (m o o o) (m o o)" - 10
S(2) = "(m o o m o o o m o o) (m o o o o) (m o o m o o o m o o)" - 25
*/

~~~
