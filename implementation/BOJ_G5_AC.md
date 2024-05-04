https://www.acmicpc.net/problem/5430

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = new Array(t).fill(null);

for (let tc = 0; tc < t; tc++) {
  let orders = input[tc * 3 + 1];
  let [n] = input[tc * 3 + 2].split(" ").map(Number);
  let arr = input[tc * 3 + 3]
    .split(/[,\[\]]/)
    .filter((item) => item !== "")
    .map(Number);
  //<------------input

  let [start, end] = [0, arr.length - 1];
  let dir = true;
  for (let order of orders) {
    //돌리기 명령
    if (order === "R") {
      dir = !dir;
    }
    //삭제 명령
    else {
      //삭제할 수 없는 상태
      if (start > end) {
        answer[tc] = "error";
        break;
      }
      //정방향이면 맨 앞 지움
      if (dir) {
        start++;
      }
      //역방향이면 맨 뒤 지움
      else {
        end--;
      }
    }
  }

  if (answer[tc] === "error") {
    continue;
  }
  //남은 배열 출력
  answer[tc] =
    "[" +
    (dir
      ? arr.slice(start, end + 1).join(",")
      : arr
          .slice(start, end + 1)
          .reverse()
          .join(",")) +
    "]";
}

answer = answer.join("\n");

console.log(answer);

~~~

직접 배열 원본을 reverse, shift 하면 메모리, 시간적으로 불필요한 연산을 하게 되는 것이다  
방향을 가르키는 dir, 시작과 끝을 나타내는 start, end로 대체해야하는 문제이다  
