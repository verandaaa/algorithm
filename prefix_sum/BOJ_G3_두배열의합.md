https://www.acmicpc.net/problem/2143

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [k] = input[0].split(" ").map(Number);
let [n] = input[1].split(" ").map(Number);
let arr1 = input[2].split(" ").map(Number);
let [m] = input[3].split(" ").map(Number);
let arr2 = input[4].split(" ").map(Number);
//<------------input
let answer = 0;

//누적합 구하기
let sum1 = new Array(n + 1).fill(0);
let sum2 = new Array(m + 1).fill(0);
for (let i = 1; i < n + 1; i++) {
  sum1[i] = sum1[i - 1] + arr1[i - 1];
}
for (let i = 1; i < m + 1; i++) {
  sum2[i] = sum2[i - 1] + arr2[i - 1];
}

//만들 수 있는 합의 종류 구하기
let map1 = new Map();
let map2 = new Map();
for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < i; j++) {
    let s = sum1[i] - sum1[j];
    map1.set(s, map1.get(s) + 1 || 1);
  }
}
for (let i = 1; i < m + 1; i++) {
  for (let j = 0; j < i; j++) {
    let s = sum2[i] - sum2[j];
    map2.set(s, map2.get(s) + 1 || 1);
  }
}

//두 합이 k를 만족하는 개수
for (let [key, value] of map1) {
  answer += value * (map2.get(k - key) || 0);
}

console.log(answer);

~~~
map을 사용한 방법

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [k] = input[0].split(" ").map(Number);
let [n] = input[1].split(" ").map(Number);
let arr1 = input[2].split(" ").map(Number);
let [m] = input[3].split(" ").map(Number);
let arr2 = input[4].split(" ").map(Number);
//<------------input
let answer = 0;

//누적합 구하기
let sum1 = new Array(n + 1).fill(0);
let sum2 = new Array(m + 1).fill(0);
for (let i = 1; i < n + 1; i++) {
  sum1[i] = sum1[i - 1] + arr1[i - 1];
}
for (let i = 1; i < m + 1; i++) {
  sum2[i] = sum2[i - 1] + arr2[i - 1];
}

//만들 수 있는 합의 종류 구하기
let list1 = [];
let list2 = [];
for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < i; j++) {
    let s = sum1[i] - sum1[j];
    list1.push(s);
  }
}
for (let i = 1; i < m + 1; i++) {
  for (let j = 0; j < i; j++) {
    let s = sum2[i] - sum2[j];
    list2.push(s);
  }
}
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

//투포인터로 두 합이 k가 되도록 만드는 개수 찾기
let left = 0;
let right = list2.length - 1;
while (left < list1.length && right >= 0) {
  let a = list1[left];
  let b = list2[right];
  let sum = a + b;

  if (sum === k) {
    let aCount = 0;
    let bCount = 0;
    while (left < list1.length && list1[left] === a) {
      left++;
      aCount++;
    }
    while (right >= 0 && list2[right] === b) {
      right--;
      bCount++;
    }
    answer += aCount * bCount;
  } //
  else if (sum > k) {
    right--;
  } //
  else {
    left++;
  }
}

console.log(answer);

~~~
정렬 및 투포인터를 사용하는 방법
