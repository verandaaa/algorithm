https://www.acmicpc.net/problem/17179

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m, l] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + m).map(Number);
let arr2 = input.slice(1 + m, 1 + m + n).map(Number);
//<------------input
let answer = "";

for (let cut of arr2) {
  let max = 0; //토막 크기
  let left = 0; //최소
  let right = l; //최대
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let cur = 0;
    let count = 0;
    for (let point of arr1) { //자를 수 있는 지점 중에서
      if (point - cur >= mid) { //기준 이상의 토막을 만들 수 있다면
        count++;
        cur = point; //자른다
      }
      if (count === cut) { //자르는 횟수 충족시 멈춘다
        break;
      }
    }
    if (count !== cut || l - cur < mid) { //자르는 횟수가 모자라거나, 꼬투리 크기가 기준 토막보다 작으면
      right = mid - 1; //기준 하향
    } else {
      left = mid + 1; //기준 상향
      max = mid; //기준(토막크기) 저장
    }
  }
  answer += max + "\n";
}

console.log(answer);

~~~
