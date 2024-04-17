https://www.acmicpc.net/problem/1107

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [m] = input[1].split(" ").map(Number);
let arr = m > 0 ? input[2].split(" ").map(Number) : [];
//<------------input

//100에서 + - 만 눌렀을 경우 기본 횟수
let answer = Math.abs(100 - n);

//사용할 수 있는 버튼 체크
let check = [];
for (let i = 0; i < 10; i++) {
  if (!arr.includes(i)) {
    check.push(i);
  }
}

let list = [];
let cur = [];
//6자리 까지 수 만들기
for (let k = 1; k <= 6; k++) {
  dfs(0, k);
}

function dfs(end, size) {
  //맨 앞자리가 0인 경우 제외
  if (cur[0] === 0 && size > 1) {
    return;
  }
  //수 완성되었다
  if (end === size) {
    let s = cur.join("");
    list.push(s);
    return;
  }
  //자리수 채우기
  for (let x of check) {
    cur.push(x);
    dfs(end + 1, size);
    cur.pop();
  }
}

//버튼으로만 만든 수를 기준으로, + - 버튼 눌러보자
for (let i = 0; i < list.length; i++) {
  if (list[i] >= n) {
    let left = i - 1 >= 0 ? list[i - 1].length + n - Number(list[i - 1]) : Infinity;
    let right = list[i].length + Number(list[i]) - n;
    answer = Math.min(answer, left, right);
    break;
  }
}
//만들 수 있는 가장 큰 수보다 n이 더 크다면
if (Number(list[list.length - 1]) < n) {
  answer = Math.min(answer, list[list.length - 1].length + n - Number(list[list.length - 1]));
}

console.log(answer);

~~~
107816KB	760ms  
버튼으로 만들 수 있는 수를 순열로 구하기 때문에 메모리가 많이 든다  
그리고 가장 근접한 버튼수를 찾아 +-버튼을 몇번 더 눌러야하는지 셌다  

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [m] = input[1].split(" ").map(Number);
let arr = m > 0 ? input[2].split(" ") : [];
//<------------input

//100에서 + - 만 눌렀을 경우 기본 횟수
let answer = Math.abs(100 - n);

//n이 0~500000이므로, 1000000미만의 버튼만 눌러야 최소값 가능성이라도 있음
for (let i = 0; i < 1000000; i++) {
  let string = i.toString();
  let flag = true;

  //i라는 버튼을 누르려고 할때
  for (let x of string) {
    if (arr.includes(x)) {
      flag = false;
      break;
    }
  }
  //모두 누를 수 있는 버튼이라면 n까지의 횟수는?
  if (flag) {
    answer = Math.min(answer, Math.abs(i - n) + string.length);
  }
}

console.log(answer);

~~~
19196KB	340ms  
버튼으로 만들 수 있는 수를 반복문으로 구하여 메모리를 줄인다  
그리고 그 모든 버튼수에 대하여 +-버튼을 몇번 더 눌러야하는지 셌다  
