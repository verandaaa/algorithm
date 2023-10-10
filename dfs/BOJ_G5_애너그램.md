https://www.acmicpc.net/problem/6443

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, d] = input[0].split(" ").map((v) => v * 1);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

let string;
let set;
let cur;
let check;
for (let i = 0; i < n; i++) {
  string = [...arr[i]].sort();
  set = new Set();
  cur = "";
  check = Array.from(Array(string.length), () => false);
  dfs(0);
}

function dfs(end) {
  if (end === string.length) {
    answer += cur + "\n";
    return;
  }
  for (let i = 0; i < string.length; i++) {
    if (check[i]) {
      continue;
    }
    if (set.has(cur + string[i])) {
      continue;
    }
    set.add(cur);
    check[i] = true;
    cur += string[i];
    dfs(end + 1);
    check[i] = false;
    cur = cur.substring(0, cur.length - 1);
  }
}

console.log(answer);
~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, d] = input[0].split(" ").map((v) => v * 1);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

let string;
let cur;
let map;
for (let i = 0; i < n; i++) {
  string = [...arr[i]].sort();
  cur = [];
  map = new Map();
  for (let x of string) {
    map.set(x, map.get(x) + 1 || 1);
  }
  dfs(0);
}

function dfs(end) {
  if (end === string.length) {
    answer += cur.join("") + "\n";
    return;
  }
  for (let [key, value] of map) {
    if (value === 0) {
      continue;
    }
    map.set(key, value - 1);
    cur.push(key);
    dfs(end + 1);
    map.set(key, value);
    cur.pop();
  }
}

console.log(answer);
~~~

# Pass 3 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, d] = input[0].split(" ").map((v) => v * 1);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

let string;
let cur;
let check;
for (let i = 0; i < n; i++) {
  string = [...arr[i]].sort().join("");
  cur = [];
  map = new Map();
  check = Array.from(Array(26), () => 0);
  for (let j = 0; j < string.length; j++) {
    check[string.charCodeAt(j) - 97] += 1;
  }
  dfs(0);
}

function dfs(end) {
  if (end === string.length) {
    answer += cur.join("") + "\n";
    return;
  }
  for (let i = 0; i < 26; i++) {
    if (check[i] === 0) {
      continue;
    }
    check[i]--;
    cur.push(String.fromCharCode(i + 97));
    dfs(end + 1);
    check[i]++;
    cur.pop();
  }
}

console.log(answer);

~~~

순열 + 결과 중복 금지 -> 요소의 개수 세서 관리하기
