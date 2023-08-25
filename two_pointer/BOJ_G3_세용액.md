https://www.acmicpc.net/problem/2473

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input

let minSum = Infinity;
let answer;

arr.sort((a, b) => a - b);
for (let i = 0; i < n - 2; i++) {
  let a = arr[i]; //하나의 수는 고정시키고 무조건 넣는다고 생각하고
  let left = i + 1; //나머지 수들로 투포인터
  let right = n - 1;

  while (left < right) {
    let b = arr[left];
    let c = arr[right];
    if (Math.abs(a + b + c) < minSum) {
      minSum = Math.abs(a + b + c);
      answer = a + " " + b + " " + c;
    }

    if (a + b + c < 0) {
      left++;
    } else if (a + b + c > 0) {
      right--;
    } else {
      break;
    }
  }
}

console.log(answer);

~~~

두 용액의 경우 투포인터를 사용한다고 바로 알 수 있었다  
RGB거리에서 RGB거리2를 풀때 조건이 추가되어 하나를 고정시킨 것 처럼  
세 용액도 하나를 고정시키고 기존 풀이대로 한다  
