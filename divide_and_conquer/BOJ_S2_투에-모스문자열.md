https://www.acmicpc.net/problem/18222

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(BigInt);
//<------------input
let answer = 0;

//2^60 > 10^18
let x = 60;
while (BigInt(Math.pow(2, x)) > n) {
  x--;
}

//2^(x) <= n < 2^(x+1)
let count = 0;
while (n !== BigInt(1)) {
  if (BigInt(2 ** x) < n) {
    n -= BigInt(2 ** x);
    count++;
  }
  x--;
}

answer = count % 2 === 1 ? 1 : 0;

console.log(answer);

~~~
