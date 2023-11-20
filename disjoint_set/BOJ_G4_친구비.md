https://www.acmicpc.net/problem/16562

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

arr1.unshift(0);
let parents = Array.from(Array(n + 1), (_, i) => i);
for (let [v, w] of arr2) {
  union(v, w); //집합 구하기
}

function union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot === bRoot) {
    return;
  }

  //루트는 비용이 적은 친구 기준
  if (arr1[aRoot] < arr1[bRoot]) {
    parents[bRoot] = aRoot;
  } //비용이 같은 경우도 포함해 주어야 함!
  else {
    parents[aRoot] = bRoot;
  }
}

function findRoot(x) {
  if (parents[x] === x) {
    return x;
  }
  return findRoot(parents[x]);
}

//루트 찾아서 비용 지출
let set = new Set();
for (let i = 1; i < n + 1; i++) {
  set.add(findRoot(i));
}
for (let index of set) {
  answer += arr1[index];
}
answer = answer > k ? "Oh no" : answer;

console.log(answer);

~~~

union에서 index를 기준으로 합치는 것이 아니기 때문에, 대소관계 주의 할 것  
parents는 연결되어있음을 나타낼 뿐, 루트를 가르키는 것은 아니다
