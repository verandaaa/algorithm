https://www.acmicpc.net/problem/11663

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let dots = input[1].split(" ").map(Number);
let lines = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

dots.sort((a, b) => a - b);

let left, right, dot1, dot2;

for (let [start, end] of lines) {
  //시작점보다 크거나 같은 점 인덱스 찾기
  left = 0;
  right = n - 1;
  dot1 = n;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (dots[mid] < start) {
      left = mid + 1;
    } else {
      dot1 = mid;
      right = mid - 1;
    }
  }

  //끝점보다 작거나 같은 점 인덱스 찾기
  left = 0;
  right = n - 1;
  dot2 = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (dots[mid] > end) {
      right = mid - 1;
    } else {
      dot2 = mid;
      left = mid + 1;
    }
  }

  answer += dot2 - dot1 + 1 + "\n";
}

console.log(answer);

~~~

```
5 2
5 6 7 8 9
1 2
11 12
    
# Answer
0
0
```

주의할 점은 위 예시 처럼 시작점보다 크거나 같은 점을 찾을 수 없다 or 끝점보다 작거나 같은 점을 찾을 수 없다 의 경우 때문에  
dot1, dot2의 초기값을 세팅해주어야 한다  
