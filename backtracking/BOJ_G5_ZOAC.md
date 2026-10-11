https://www.acmicpc.net/problem/16719

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];

//<------------input
let answer = "";

let n = string.length;
let leastString, leastIndex, size;

let check = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
  leastString = "Z".repeat("101");
  leastIndex = -1;
  size = i + 1;

  dfs(i);

  //그 인덱스는 check됨, 그리고 최소 문자열 출력
  answer += leastString + "\n";
  check[leastIndex] = size;
}

function dfs(end) {
  if (end === size) {
    let nString = "";
    //check가 true인 것들에 대해서 문자열을 만들고
    for (let i = 0; i < n; i++) {
      if (check[i] >= 1) {
        nString += string[i];
      }
    }
    //그 문자열에 최소를 갱신한다면 index에 메모
    if (nString.localeCompare(leastString) < 0) {
      leastString = nString;
      leastIndex = check.indexOf(size);
    }
    return;
  }
  //미사용된 문자 사용하기
  for (let i = 0; i < n; i++) {
    if (check[i] === 0) {
      check[i] = size;
      dfs(end + 1);
      check[i] = 0;
    }
  }
}

console.log(answer);

~~~
전체 문자열에서 한개씩 추가로 선택하는 방법

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];

//<------------input
let answer = "";

let n = string.length;
let check = new Array(n + 1).fill(false);

dfs(0, n - 1);

function dfs(left, right) {
  let leastChar = "ZZ";
  let leastIndex = -1;
  //구간에서 가장 작은 문자를 고름
  for (let i = left; i <= right; i++) {
    if (!check[i]) {
      if (string[i].localeCompare(leastChar) < 0) {
        leastChar = string[i];
        leastIndex = i;
      }
    }
  }
  //문자를 전부 뽑은 경우
  if (leastIndex === -1) {
    return;
  }
  //가장 작은 문자 인덱스 체크
  check[leastIndex] = true;
  //이번 단계에 뽑은 문자열 출력하기
  let newString = "";
  for (let i = 0; i < n; i++) {
    if (check[i]) {
      newString += string[i];
    }
  }
  answer += newString + "\n";
  //뽑은 최소 문자 기준으로 오른쪽을 먼저 뽑아야 사전순 정렬이 됨
  dfs(leastIndex + 1, right);
  dfs(left, leastIndex - 1);
}

console.log(answer);

~~~
뽑은 문자 기준으로 오른쪽, 왼쪽을 탐색하며 한개씩 선택하는 방법
