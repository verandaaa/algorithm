https://www.acmicpc.net/problem/15728

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
//<------------input
let answer = [];

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

let min = arr1[0];
let max = arr1[n - 1]; //공유카드에서는 제일 크거나, 제일 작은 수를 선택함

for (let i = 0; i + n - k <= n; i++) {
  let slice = arr2.slice(i, i + n - k); //팀카드에서 사용하게 할 카드 묶음을 제시함(k개를 제외 한 것)

  let big = Math.max(min * slice[0], max * slice[slice.length - 1]);
  answer.push(big); //그 중 가장 큰 수를 구함
}

answer.sort((a, b) => -a + b);
answer = answer[k]; //상대가 제시할 수 있는 견제 k를 제외하고 큰 수를 선택하게 함

console.log(answer);

~~~

# Fail 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
//<------------input
let answer = 0;

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

let min = arr1[0];
let max = arr1[n - 1];

let left = 0;
let right = n - 1;
for (let i = 0; i < k; i++) {
  //큰 숫자를 못 만드도록 하기
  if (min * arr2[left] > max * arr2[right]) {
    left++;
  } else {
    right--;
  }
}

answer = Math.max(min * arr2[left], max * arr2[right]);

console.log(answer);

/*
5 2
1 2 3 4 5
-1 -2 -3 -4 -5
*/

~~~

투포인터는 동일한 값을 가질때 기준을 제시 할 수 없어서 불가능  
