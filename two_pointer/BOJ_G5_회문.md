https://www.acmicpc.net/problem/17609

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = [];

for (let string of arr) {
  let count = 0;

  let left = 0;
  let right = string.length - 1;

  loop: while (left <= right) {
    //일단 기회 1번 썼음
    if (string[left] !== string[right]) {
      let flag = [true, true];

      //왼쪽을 1만큼 이동시켜서 다시 비교
      let [left2, right2] = [left, right];
      left2++;
      while (left2 <= right2) {
        //또 서로 다른 문자라면 중지
        if (string[left2] !== string[right2]) {
          flag[0] = false;
          break;
        }
        left2++;
        right2--;
      }

      //오른쪽을 1만큼 이동시켜서 다시 비교
      [left2, right2] = [left, right];
      right2--;
      while (left2 <= right2) {
        //또 서로 다른 문자라면 중지
        if (string[left2] !== string[right2]) {
          flag[1] = false;
          break;
        }
        left2++;
        right2--;
      }
      //다시 비교했을때, 통과가 됐는가 or 안됐는가
      count = flag[0] || flag[1] ? 1 : 2;

      break loop;
    }
    //기회 안쓰고 직진
    else {
      left++;
      right--;
    }
  }

  answer.push(count);
}

answer = answer.join("\n");

console.log(answer);

//xyyyxy의 경우 때문에 일치하지 않는 시점부터 다시 반복문을 돌린다
~~~
