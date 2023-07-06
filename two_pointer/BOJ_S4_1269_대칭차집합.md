https://www.acmicpc.net/problem/1269

# Solution 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr1 = input[1]
  .split(" ")
  .map((v) => v * 1)
  .sort((a, b) => a - b);
let arr2 = input[2]
  .split(" ")
  .map((v) => v * 1)
  .sort((a, b) => a - b);

//<------------input
let answer = 0;
let i = 0, j = 0;

while (true) {
  if (arr1.length === i || arr2.length === j) {
    answer += arr1.length - i + arr2.length - j;
    break;
  }
  if (arr1[i] > arr2[j]) {
    j++;
    answer++;
  } else if (arr1[i] === arr2[j]) {
    i++;
    j++;
  } else if (arr1[i] < arr2[j]) {
    i++;
    answer++;
  }
}

console.log(answer);
~~~
포인터 2개 사용  <br/><br/><br/>

# Solution 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr1 = input[1].split(" ").map((v) => v * 1);
let arr2 = input[2].split(" ").map((v) => v * 1);

//<------------input
let answer = arr1.length + arr2.length;

let set = new Set();
for (let x of arr1) {
  set.add(x);
}

for (let x of arr2) {
  if (set.has(x)) {
    answer -= 2;
  }
}

console.log(answer);
~~~
자료구조 set 사용  <br/><br/><br/>
