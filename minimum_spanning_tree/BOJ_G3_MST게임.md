https://www.acmicpc.net/problem/16202

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = new Array(k).fill(0);

let isOn = new Array(m + 1).fill(true);
let parents;

//이 과정은 K턴에 걸쳐서 진행되며, MST 게임은 그래프에서 간선을 하나씩 제거하면서 MST의 비용을 구하는 게임이다.
for (let kc = 0; kc < k; kc++) {
  let sum = 0;
  let count = 0;
  let first = null;
  parents = new Array(n + 1).fill().map((_, i) => i);
  //모든 간선에 대해서
  for (let i = 0; i < m; i++) {
    let [a, b, c] = [...arr[i], i + 1];

    //한 번 제거된 간선은 이후의 턴에서 사용할 수 없다.
    if (!isOn[i]) {
      continue;
    }

    if (Union(a, b)) {
      sum += c;
      count++;
      //그 턴에서 구한 MST에서 가장 가중치가 작은 간선 하나를 제거한다.
      if (first === null) {
        first = i;
        isOn[i] = false;
      }
      if (count === n - 1) {
        break;
      }
    }
  }
  if (count === n - 1) {
    answer[kc] = sum;
  }
  //어떤 턴에서 MST를 만들 수 없다면, 그 턴의 점수는 0이다. 당연히 이후 모든 턴의 점수도 0점이다. 첫 턴에 MST를 만들 수 없는 경우도 있다.
  else {
    break;
  }
}

function Union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    return true;
  } //
  else if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    return true;
  } //
  else {
    return false;
  }
}

function findRoot(x) {
  if (x === parents[x]) {
    return x;
  }
  return findRoot(parents[x]);
}

answer = answer.join(" ");

console.log(answer);

~~~
