https://www.acmicpc.net/problem/20955

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let parents = new Array(n + 1).fill().map((_, i) => i);

//이미 주어진 시냅스에 대해서 유니온파인드
//count는 현재까지 시냅스의 수
let count = 0;
for (let [a, b] of arr) {
  //두 뉴런은 서로 다른 집합에서 존재하므로 합칠 수 있다
  if (union(a, b)) {
    count++;
  }
  //합칠 수 없어 끊어야한다
  else {
    answer++;
  }
}

//모든 뉴런을 연결시키는 시냅스 수는 n-1이므로
answer += n - 1 - count;

function union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    return true;
  } //
  else if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    return true;
  }
  return false;
}

function findRoot(x) {
  if (x === parents[x]) {
    return x;
  }
  return findRoot(parents[x]);
}

console.log(answer);

~~~
