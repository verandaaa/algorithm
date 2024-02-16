https://www.acmicpc.net/problem/1823

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

let dp = new Array(n).fill().map(() => new Array(n).fill(0));

answer = recursion(0, n - 1, 1);

function recursion(left, right, value) {
  //원소는 1칸보다 더 쪼개질 수 없음
  if (left > right) {
    return 0;
  }

  //이미 탐색완료한 구간
  if (dp[left][right] !== 0) {
    return dp[left][right];
  }

  //왼쪽을 먹은 경우, 오른쪽을 먹은 경우로 나눈다
  let sec1 = recursion(left + 1, right, value + 1) + value * arr[left];
  let sec2 = recursion(left, right - 1, value + 1) + value * arr[right];

  //리턴받은 중 최대를 선택
  dp[left][right] = Math.max(sec1, sec2);

  return dp[left][right];
}

console.log(answer);

~~~

처음에 https://www.acmicpc.net/problem/6137 이 문제와 똑같다고 생각해 투포인터+그리디로 풀이했다  
하지만 k는 점점 늘어나기 때문에 7 5 2 1 8 의 경우 7보다 8을 먼저 뽑아야했다  
