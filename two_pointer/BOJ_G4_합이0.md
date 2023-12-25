https://www.acmicpc.net/problem/3151

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

arr.sort((a, b) => a - b);

for (let i = 0; i < n - 2; i++) { //첫 자리 고정해놓고
  let left = i + 1;
  let right = n - 1;
  while (left < right) { //나머지 두개 고르기
    let [a, b, c] = [arr[i], arr[left], arr[right]];
    let sum = a + b + c;

    if (sum === 0) {
      let lc = 0;
      let rc = 0;
      if (b === c) { //처음과 끝이 같은 경우는 조합으로 구하기
        let k = right - left + 1;
        answer += (k * (k - 1)) / 2;
        break;
      }
      while (arr[left] === b) { //같은 수면 오른쪽으로 이동
        lc++;
        left++;
      }
      while (arr[right] === c) { //같은 수면 왼쪽으로 이동
        rc++;
        right--;
      }
      answer += lc * rc; //개수 곱 더하기
    } //
    else if (sum > 0) {
      right--;
    } //
    else if (sum < 0) {
      left++;
    }
  }
}

console.log(answer);

~~~
