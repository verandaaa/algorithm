https://www.acmicpc.net/problem/16139

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let s = input[0];
let [n] = input[1].split(" ").map(Number);
let arr = input.slice(2, 2 + n).map((v) => v.split(" "));
//<------------input
let answer = "";

let sum = new Array(s.length + 1).fill(null).map(() => new Array(26).fill(0));
for (let i = 1; i < s.length + 1; i++) {
  const code = s.charCodeAt(i - 1) - 97;
  sum[i][code]++;
  for (let j = 0; j < 26; j++) {
    sum[i][j] += sum[i - 1][j];
  }
}

for (let [ch, l, r] of arr) {
  const code = ch.charCodeAt(0) - 97;
  l = Number(l);
  r = Number(r);

  let res = sum[r + 1][code] - sum[l][code];

  answer += res + "\n";
}

console.log(answer);

~~~
