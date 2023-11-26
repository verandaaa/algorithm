https://www.acmicpc.net/problem/1990

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

m = Math.min(m, 10000000);
let check = new Array(m + 1).fill(true);
check[0] = false;
check[1] = false;

for (let i = 2; i < m + 1; i++) {
  if (!check[i]) {
    continue;
  }
  for (let j = 2 * i; j < m + 1; j += i) {
    check[j] = false;
  }
}
for (let i = n; i < m + 1; i++) {
  if (!check[i]) {
    continue;
  }
  let reverse = i.toString().split("").reverse().join("");
  if (i == reverse) {
    answer += i + "\n";
  }
}
answer += "-1";

console.log(answer);

~~~

먼저 1억의 배열 크기는 메모리 초과가 발생할 것이다  
천만 이상의 소수인 팰린드롬인 수는 존재하지 않으므로 최대 크기를 천만으로 잡는다  

이번에 새롭게 안 것인데  
~~~javascript
let check = Array.from(Array(m + 1), () => true); //380000KB 1800ms
let check = Array.from({length : m + 1}, () => true); //100000KB 1800ms
let check = new Array(m + 1).fill(true); //100000KB 1000ms
~~~
같은 배열이지만 선언 방식에 따라 메모리와 실행시간이 눈에 띄게 차이나는 것을 확인하였다  
앞으로는 세번째 방식을 사용하도록...  
