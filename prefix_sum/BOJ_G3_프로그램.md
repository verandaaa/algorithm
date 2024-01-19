https://www.acmicpc.net/problem/2900

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let [q] = input[2].split(" ").map(Number);
let arr2 = input.slice(3, 3 + q).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = new Array(n + 1).fill(0);

//x와 빈도수 메모
let map = new Map();
for (let x of arr1) {
  map.set(x, map.get(x) + 1 || 1);
}

//시작점과 끝점 메모
for (let [key, value] of map) {
  for (let i = 0; i < n; i += key) {
    list[i] += value;
    list[i + 1] -= value;
  }
}

//k번 호출 후 배열의 결과
for (let i = 1; i < n; i++) {
  list[i] += list[i - 1];
}

//누적합 구하기
let list2 = [0];
for (let i = 0; i <= n; i++) {
  list2.push(list2[i] + list[i]);
}

//구간합 구하기
for (let [l, r] of arr2) {
  answer += list2[r + 1] - list2[l] + "\n";
}

console.log(answer);

~~~
