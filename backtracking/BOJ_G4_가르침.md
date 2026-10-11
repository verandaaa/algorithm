https://www.acmicpc.net/problem/1062

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = 0;

//돌 필요도 없는 경우
if (m < 5) {
  console.log(answer);
  return;
}
if (m === 26) {
  answer = n;
  console.log(answer);
  return;
}

//이미 사용한 알파벳 체크
let check = Array.from(Array(26), () => false);
check[0] = true;
check[2] = true;
check[8] = true;
check[13] = true;
check[19] = true;

//a,c,i,n,t를 제외하고 인덱스 값을 set에 넣어두기
arr = arr
  .map((string) => string.substring(4, string.length - 4))
  .map((string) => {
    let set = new Set();
    for (let x of string) {
      let index = x.charCodeAt(0) - 97;
      if (!check[index]) {
        set.add(index);
      }
    }
    return set;
  });

//완탐
let size = m - 5;
dfs(0, 0);

function dfs(end, start) {
  if (end === size) {
    //사용할 수 있는 알파벳을 모두 씀
    let count = 0;
    for (let set of arr) {
      //문자열 목록에서
      let flag = true;
      for (let x of set) {
        //문자 당
        if (!check[x]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        //문자열 내 모든 문자가 존재하는 조합이라면
        count++;
      }
    }
    answer = Math.max(answer, count);
    return;
  }
  for (let i = start; i < 26; i++) {
    //알파벳 고르기
    if (check[i]) {
      continue;
    }
    check[i] = true;
    dfs(end + 1, i + 1);
    check[i] = false;
  }
}

console.log(answer);

~~~
