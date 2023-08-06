https://www.acmicpc.net/problem/10844

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map((v) => v * 1);

//<------------input
let answer = 0;

let arr = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]; //1자리 기준

for (let i = 2; i <= n; i++) {
  let new_arr = Array.from(Array(10), () => 0);
  for (let j = 0; j < 10; j++) {
    if (j - 1 >= 0) new_arr[j - 1] += arr[j] % 1000000000; //ex arr[1] = 1이면, new_arr[0]+=1 new_arr[2]+=1
    if (j + 1 < 10) new_arr[j + 1] += arr[j] % 1000000000;
  }
  arr = new_arr;
}
answer = arr.reduce((a, b) => a + b, 0); //다 더함
answer %= 1000000000;

console.log(answer);

~~~
