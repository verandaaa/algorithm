https://www.acmicpc.net/problem/1052

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let nn = n.toString(2); //2진수 변환 1101

let count = 0;
for (let i = 0; i < nn.length; i++) {
  if (nn[i] === "1") {
    count++;
    if (count === k) { //이제 물병 소지 제한에 도달
      let a = "1" + "0".repeat(nn.length - 1 - i); //마지막 물병을 a로 합쳐져야한다 100
      let b = nn.substring(i + 1, nn.length); //자투리 물병들 상태 01
      if (b.length && parseInt(b, 2) !== 0) { //자투리 물병이 있을때만
        answer = parseInt(a, 2) - parseInt(b, 2); //상점에서 사야할 물병 양
      }
      break;
    }
  }
}

console.log(answer);

~~~
