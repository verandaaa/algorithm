https://www.acmicpc.net/problem/19539

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = "NO";

//2의 개수와 1의 개수를 센다
let [count1, count2] = [0, 0];
for (let s of arr) {
  count1 += s % 2;
  count2 += Math.floor(s / 2);
}

//2는 1을 2개로 교환이 가능하다
//count2 - x = count1 + 2 * x 식이 성립한다
let x = (count2 - count1) / 3;

if (x >= 0 && x % 1 === 0) {
  answer = "YES";
}

console.log(answer);

~~~
