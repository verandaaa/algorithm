https://www.acmicpc.net/problem/2876

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = new Array(6).fill(0); //최대 인원
let maxCount = 0;

//가능한 그레이드 중 하나를 선택
for (let g = 1; g <= 5; g++) {
  let left = 0;
  //연속된 특정 g 값이 얼마나 길게 이어지는지 확인
  for (let right = 0; right < n; right++) {
    if (arr[right][0] === g || arr[right][1] === g) {
      continue;
    }
    list[g] = Math.max(list[g], right - left);
    left = right + 1;
  }
  list[g] = Math.max(list[g], n - left);

  //정답의 가능성 체크
  if (list[g] > maxCount) {
    answer = list[g] + " " + g;
    maxCount = list[g];
  }
}

console.log(answer);

~~~
