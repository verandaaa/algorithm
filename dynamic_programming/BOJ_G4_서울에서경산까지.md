https://www.acmicpc.net/problem/14863

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

arr.unshift([]);
let dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(-1));
dp[0][0] = 0;
for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < m + 1; j++) {
    //j분일때 마지막으로 들린 적 없다
    if (dp[i - 1][j] === -1) {
      continue;
    }
    //도보 or 자전거
    for (let k = 0; k <= 2; k += 2) {
      //j분에서 시간을 더 쓸 수 있다
      if (j + arr[i][k] <= m) {
        dp[i][j + arr[i][k]] = Math.max(dp[i][j + arr[i][k]], dp[i - 1][j] + arr[i][k + 1]);
      }
    }
  }
}
answer = Math.max(...dp[n]);

console.log(answer);


/*
입력
2 4
2 5 2 2
2 2 2 2

dp값
[ [ 0, -1, -1, -1, -1 ], [ -1, -1, 5, -1, -1 ], [ -1, -1, -1, -1, 7 ] ]
*/

~~~

배낭 알고리즘이라고 생각했는데 잘못 생각했었다.  
배낭은 m무게만큼 들 수 있다고 할때, n개의 보석중에서 가장 큰 무게가 되도록 보석을 고르는 것이다.  
따라서 모든 보석을 고를수도 있고 몇개만 고를 수도 있고 하나도 못 고를 수 도 있다.  
이 문제는 서울에서 경산까지 모든 지점을 반드시 통과야해야 한다.  
따라서 i-1 지점까지의 정확한 방문 시간에서만 i 지점으로 이동할 수 있다.  
