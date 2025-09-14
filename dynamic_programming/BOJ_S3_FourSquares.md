https://www.acmicpc.net/problem/17626

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let dp = new Array(n + 1).fill(0);
dp[1] = 1;
let c = 1;
for (let i = 2; i <= n; i++) {
  if ((c + 1) * (c + 1) === i) {
    dp[i] = 1;
    c++;
  } //
  else {
    let min = Infinity;
    for (let j = 1; j <= c; j++) {
      min = Math.min(min, dp[i - j * j]);
    }
    dp[i] = min + 1;
  }
}

answer = dp[n];

console.log(answer);

~~~

가장 큰 제곱수만 더한다고 구할 수 없다  
26은 25 + 1 로 2개로 되지만  
23은 16 + 4 + 1 + 1 + 1 로 5개가 되는데, 사실 9 + 9 + 4 + 1 이 가능하다  
제곱수는 1이라는 가장 작은 결과이기 때문에, 제곱수들을 합쳐서 만든 수들 중 무조건 답이 있게 되어있다.  
1, 4, 9, 16이 있으면 23에서 해당 값들을 뺀 값인 dp[22], dp[19], dp[14], dp[7] 중에서 가장 작은 값에 +1을 해준 값이 dp[23]이 된다.  
