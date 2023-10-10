https://www.acmicpc.net/problem/1759

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ");
//<------------input
let answer = "";

arr.sort();
let string = [];
let set = new Set(["a", "e", "i", "o", "u"]);

dfs(0, 0, 0, 0);

function dfs(end, start, cnt1, cnt2) {
  if (end === n) {
    if (cnt1 >= 1 && cnt2 >= 2) {
      answer += string.join("").concat("\n");
    }
    return;
  }
  for (let i = start; i < m; i++) {
    string.push(arr[i]);
    dfs(
      end + 1,
      i + 1,
      cnt1 + (set.has(arr[i]) ? 1 : 0),
      cnt2 + (set.has(arr[i]) ? 0 : 1)
    );
    string.pop();
  }
}

console.log(answer);

~~~
