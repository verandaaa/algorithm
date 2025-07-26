https://www.acmicpc.net/problem/6236

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

let start = 1;
let end = 100000 * 10000;
while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  let remain = 0;
  let count = 0;
  for (let i = 0; i < n; i++) {
    let money = arr[i];
    //통장에서 뺀 돈으로 하루를 보낼 수 있으면 그대로 사용하고
    if (remain >= money) {
      remain -= money;
    } //
    else {
      // 모자라게 되면 남은 금액은 통장에 집어넣고 다시 K원을 인출한다.
      if (money <= mid) {
        remain = mid - money;
        count++;
      }
      // 도처히 K원으로는 소비를 견딜 수 없다.
      else {
        count = m + 1;
        break;
      }
    }
  }
  if (m < count) {
    start = mid + 1;
  } else {
    // console.log(mid);
    end = mid - 1;
    answer = mid;
  }
}

console.log(answer);

~~~

문제를 잘 이해하고 조건을 잘 설정 해야 하는 문제  
구현의 느낌도 살짝 났다  
