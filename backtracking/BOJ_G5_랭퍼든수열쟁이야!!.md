https://www.acmicpc.net/problem/15918

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, x, y] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

//이 자리는 고정이다
let arr = new Array(n * 2 + 1).fill(0);
arr[x] = y - x - 1;
arr[y] = y - x - 1;

//정수 사용 여부
let check = new Array(n + 1).fill(false);
check[y - x - 1] = true;

dfs(1);

function dfs(end) {
  //모든 자리를 다 채웠다
  if (end === 2 * n) {
    answer++;
    return;
  }
  //자리가 차있다면 다음 자리로 넘어가기
  if (arr[end] !== 0) {
    dfs(end + 1);
    return;
  }
  //1~n개의 수 중에서
  for (let i = 1; i <= n; i++) {
    //사용 하지 않았고, i거리만큼 떨어질 수 있다면
    if (!check[i] && arr[end + i + 1] === 0) {
      //자리를 차지하고, 사용 체크를 하고, 다음 자리로 넘어간다
      arr[end] = i;
      arr[end + i + 1] = i;
      check[i] = true;
      dfs(end + 1);
      arr[end] = 0;
      arr[end + i + 1] = 0;
      check[i] = false;
    }
  }
}

console.log(answer);

~~~
