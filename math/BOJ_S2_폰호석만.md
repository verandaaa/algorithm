https://www.acmicpc.net/problem/21275

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [r1, r2] = input[0].split(" ");
//<------------input
let answer = [];

for (let i = 2; i <= 36; i++) {
  for (let j = 2; j <= 36; j++) {
    if (i === j) {
      continue;
    }
    let x1 = null,
      x2 = null;
    try {
      x1 = BigInt(parseInt(r1, i));
      x2 = BigInt(parseInt(r2, j));
    } catch (e) {
      continue;
    }
    if (x1 !== null && x2 != null) {
      if (x1 === x2) {
        if (x1 < BigInt(2 ** 63)) {
          answer.push([x1, i, j]);
        }
      }
    }
  }
}

if (answer.length === 0) {
  answer = "Impossible";
} else if (answer.length > 1) {
  answer = "Multiple";
} else {
  answer = answer[0].join(" ");
}

console.log(answer);

~~~

진수 변환 결과가 Nan일경우 BigInt가 불가능하므로 try문 안에 넣는다  
