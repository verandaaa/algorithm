https://www.acmicpc.net/problem/2852

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" "));
//<------------input
let answer = 0;

arr = arr.map((item) => {
  const id = Number(item[0]);
  const time = item[1].split(":");
  const total = Number(time[0]) * 60 + Number(time[1]);
  return [id, total];
});
arr.sort((a, b) => a - b);

let current = 0;
let scores = [0, 0, 0];
let results = [0, 0, 0];
for (let [id, total] of arr) {
  if (scores[1] > scores[2]) {
    results[1] += total - current;
  } else if (scores[1] < scores[2]) {
    results[2] += total - current;
  }
  current = total;

  scores[id]++;
}
if (scores[1] > scores[2]) {
  results[1] += 48 * 60 - current;
} else if (scores[1] < scores[2]) {
  results[2] += 48 * 60 - current;
}

function getString(type, value) {
  if (type === "m") {
    return `${String(Math.floor(value / 60)).padStart(2, "0")}`;
  } else if (type === "s") {
    return `${String(value % 60).padStart(2, "0")}`;
  }
}

const answer1 = `${getString("m", results[1])}:${getString("s", results[1])}`;
const answer2 = `${getString("m", results[2])}:${getString("s", results[2])}`;
answer = answer1 + "\n" + answer2;

console.log(answer);

~~~
