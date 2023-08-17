https://www.acmicpc.net/problem/1644

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input

let answer = 0;

if (n === 1) {
  console.log(0);
  return;
}

let arr = Array.from(Array(n + 1), () => true);
arr[0] = false;
arr[1] = false;
let sosu = [];
for (let i = 2; i < n + 1; i++) {
  if (arr[i]) {
    sosu.push(i);
    for (let j = i + i; j < n + 1; j += i) {
      arr[j] = false;
    }
  }
}

let sum = 0;
let left = 0;
let right = 0;
while (left <= right) {
  if (sum < n) {
    sum += sosu[right];
    if (right < sosu.length - 1) {
      right++;
    }
  } else if (sum > n) {
    sum -= sosu[left++];
  } else {
    sum += sosu[right];
    answer++;
    if (right < sosu.length - 1) {
      right++;
    }
  }
}

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input

let answer = 0;

if (n === 1) {
  console.log(0);
  return;
}

let arr = Array.from(Array(n + 1), () => true);
arr[0] = false;
arr[1] = false;
let sosu = [];
for (let i = 2; i < n + 1; i++) {
  if (arr[i]) {
    sosu.push(i);
    for (let j = i + i; j < n + 1; j += i) {
      arr[j] = false;
    }
  }
}

let sum = 0;
let left = 0;
for (let right = 0; right < n; right++) {
  sum += sosu[right];
  while (sum >= n) {
    if (sum === n) {
      answer++;
    }
    sum -= sosu[left++];
  }
}

console.log(answer);

~~~

while(left<=rigiht) 방식보다 for(let right~)방식이 더 좋다  
