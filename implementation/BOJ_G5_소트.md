https://www.acmicpc.net/problem/1083

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let [s] = input[2].split(" ").map(Number);

//<------------input
let answer = 0;

let count = 0;
for (let i = 0; i < n - 1; i++) {
  let maxValue = 0;
  let maxIndex = -1;
  //허용된 s범위 중에서 나보다 가장 큰 숫자와 인덱스를 구함
  for (let j = i + 1; j <= i + (s - count); j++) {
    if (arr[j] > arr[i]) {
      if (arr[j] > maxValue) {
        maxValue = arr[j];
        maxIndex = j;
      }
    }
  }
  //그 원소를 가져와서 내 자리에 넣음(혹은 배열값을 옆으로 복사하는 식으로)
  if (maxIndex != -1) {
    count += maxIndex - i;
    arr.splice(maxIndex, 1);
    arr.splice(i, 0, maxValue);
  }
}
answer = arr.join(" ");

console.log(answer);

~~~
