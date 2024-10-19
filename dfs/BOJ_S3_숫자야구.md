https://www.acmicpc.net/problem/2503

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ");
let arr = input.slice(1, 1 + n).map((v) => v.split(" "));
//<------------input
let answer = [];

let set = new Set();
let check = new Array(10).fill(false);
let tmp = [];
dfs(0);
//가능한 숫자야구 수 만들기
function dfs(end) {
  if (end === 3) {
    set.add(tmp.join(""));
    return;
  }
  for (let i = 1; i <= 9; i++) {
    if (!check[i]) {
      check[i] = true;
      tmp.push(i);
      dfs(end + 1);
      check[i] = false;
      tmp.pop();
    }
  }
}

//질문을 기준으로
for (let [a, b, c] of arr) {
  let nset = new Set();
  //가능성이 있는 수들중에서
  for (let na of set) {
    let [nb, nc] = [0, 0];
    for (let i = 0; i < 3; i++) {
      //Strike
      if (a.indexOf(na[i]) === i) {
        nb++;
      }
      //Ball
      else if (a.indexOf(na[i]) > -1) {
        nc++;
      }
    }
    //일치시
    if (Number(b) === nb && Number(c) === nc) {
      nset.add(na);
    }
  }
  set = nset;
}
answer = set.size;

console.log(answer);

~~~
