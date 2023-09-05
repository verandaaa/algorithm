https://www.acmicpc.net/problem/15486

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

arr.unshift([0, 0]);
arr.push([0, 0]);
let dp = Array.from(Array(n + 2), () => 0);
let max = 0;
for (let i = 1; i < n + 2; i++) {
  if (dp[i] > max) { //예전에 일한게 쌓여있다
    max = dp[i];
  }
  let j = i + arr[i][0];
  if (j < n + 2) {
    dp[j] = Math.max(dp[j], max + arr[i][1]);
  }
}
answer = max;
console.log(answer);

~~~

n이 최대 1,500,000이기 때문에 이차원 배열 메모리 초과, 이중 for문 시간초과  
dp가 n+2인 이유 -> 1일부터 0시 부터 시작하고 일 처리가 3일 걸릴때 72시간이 걸린다고 생각하면 4일에 정산을 받음  
따라서 n이 7일 23:59까지 일할 경우 8일에 정산을 받음으로 n+2로 둔다  
1일차 -> 4일 10원 (1일차 일을 하면 4일에 10원을 갖는다)  
2일차 -> 7일 20원  
3일차 -> 4일 10원  
4일차 -> max=10, 5일 30원   
5일차 -> max=30, 7일 45원   
6일차 -> x  
7일차 -> max=45, x   
8일차 -> x   

