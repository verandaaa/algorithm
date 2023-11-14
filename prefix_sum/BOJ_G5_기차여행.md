https://www.acmicpc.net/problem/10713

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input.slice(2, 2 + n - 1).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//지나온 철도의 개수 구하기
let sum = Array.from(Array(n + 1), () => 0);
for (let i = 0; i < m - 1; i++) {
  if (arr1[i] < arr1[i + 1]) {
    sum[arr1[i]]++;
    sum[arr1[i + 1]]--;
  } //
  else if (arr1[i] > arr1[i + 1]) {
    sum[arr1[i]]--;
    sum[arr1[i + 1]]++;
  }
}
for (let i = 1; i <= n; i++) {
  sum[i] += sum[i - 1];
}

//철도 개수에 따라 티켓 구하기 or ic카드 이용하기 선택
for (let i = 1; i < n; i++) {
  answer += Math.min(
    sum[i] * arr2[i - 1][0],
    sum[i] * arr2[i - 1][1] + arr2[i - 1][2]
  );
}

console.log(answer);

~~~

1->3->2->4 이동할때 while로 철도를 메모하면 시간초과 발생함  
일차원 배열에 대해서 누적합으로 철도를 구한다  
이러한 방법이 있다는 것을 기억해두자  
