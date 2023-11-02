https://www.acmicpc.net/problem/20444

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(BigInt);
//<------------input
let answer = "NO";

//a+b=n, (a+1)*(b+1)=k -> 연립방정식
let left = 0n;
let right = n / 2n;
while (left <= right) {
  let row = (left + right) / 2n;
  let col = n - row;
  let value = (row + 1n) * (col + 1n);

  if (value > k) {
    right = row - 1n;
  } //
  else if (value < k) {
    left = row + 1n;
  } //
  else {
    answer = "YES";
    break;
  }
}

console.log(answer);

~~~

원래는 연립방정식 정리해서 근의공식으로 정수해가 존재하는가 확인하려고 했으나 BigInt때문에 Math.floor가 안먹는다  
이진탐색을 할때, row와 col은 연결되어있어 바뀌어도 상관없으므로 row의 범위를 0부터 n/2로 잡는다  
정해진 row와 col을 기준으로 전체 조각이 나왔을 때, 목표 보다 많다면 right를 줄이고 적다면 left를 늘린다  
