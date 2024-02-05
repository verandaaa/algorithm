https://www.acmicpc.net/problem/21925

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let index = 0;
loop: while (true) {
  //데칼코마니 길이 설정
  for (let len = 1; ; len++) {
    //시작점이 n을 넘긴다면 종료
    if (index + len * 2 > n) {
      break loop;
    }
    let flag = true;
    //가운데를 기준으로 왼쪽 오른쪽을 한칸씩 비교
    for (let jump = 0; jump < len; jump++) {
      let left = index + jump;
      let right = index + 2 * len - 1 - jump;
      //데칼코마니가 아니라면 종료
      if (arr[left] !== arr[right]) {
        flag = false;
        break;
      }
    }
    //데칼코마니라면
    if (flag) {
      //시작점을 다음 위치로
      index += len * 2;
      break;
    }
  }
  answer++;
}
//시작점이 n과 일치하지 않는다 -> 데칼코마니는 끝내 이루어지지 못했다
if (index !== n) {
  answer = -1;
}

console.log(answer);

~~~
