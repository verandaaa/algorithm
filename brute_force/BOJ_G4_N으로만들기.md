https://www.acmicpc.net/problem/17255

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let n = input[0];
//<------------input
let answer = 0;

answer = dfs(n);

function dfs(x) { //두 수로 쪼개면서 확인
  let a = x.substring(0, x.length - 1);
  let b = x.substring(1, x.length);

  if (x.length === 1) { //한자리수가 되었다
    return 1;
  }
  if (a === b) { //둘이 같은 수라면 더 이상 쪼개질 필요가 없다
    return 1;
  }

  return dfs(a) + dfs(b);
}

console.log(answer);

~~~
