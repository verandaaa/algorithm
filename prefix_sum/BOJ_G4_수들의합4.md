https://www.acmicpc.net/problem/2015

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

//누적합 목록 : [1, 3, 6, 10, 15, 15]
//두 지점 사이의 차이가 m만큼 나던가 or 누적합 값 자체가 m이던가
let prefixSum = 0;
let map = new Map();
for (let i = 0; i < n; i++) {
  prefixSum += arr[i]; //누적합 구하기

  if (prefixSum === m) {
    //누적합 자체가 m이던가
    answer++;
  }
  answer += map.get(prefixSum - m) || 0; //두 지점 사이의 차이가 m만큼 나던가

  map.set(prefixSum, map.get(prefixSum) + 1 || 1); //누적합의 종류와 개수 메모
}

console.log(answer);

~~~
