https://www.acmicpc.net/problem/9466

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input

let answer = "";
let n, arr;
let visit, finish, count;
visit = Array.from(Array(n), () => false);

for (let i = 0; i < t; i++) {
  n = input[1 + i * 2] * 1;
  arr = input[2 + i * 2].split(" ").map((v) => v * 1 - 1);

  //검사
  finish = Array.from(Array(n), () => false);
  count = 0;
  for (let j = 0; j < n; j++) {
    dfs(j);
  }
  answer += n - count + "\n";
}

console.log(answer);

function dfs(x) {
  // console.log(x);
  if (finish[x]) {
    return;
  }
  if (visit[x]) {
    finish[x] = true;
    count++;
  }
  visit[x] = true;
  dfs(arr[x]);
  visit[x] = false;
  finish[x] = true;
}

~~~
1->2 2->3 3->4 4->2 일때  
1 2 3 4 2 3 4 2(끝) 2(끝) 3(끝) 4(끝)이렇게 dfs를 돌게 된다  
시작점에서 거치는 모든 경로들은 finish 처리를 할 것이다  
그중에서도 사이클을 거치는 경로는 true인 visit을 만나고 이때 finish처리를 한다  
친구없는 애들은 true인 visit를 만나지 못하고 그대로 finish처리된다
