https://www.acmicpc.net/problem/7490

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = new Array(9).fill(null).map(() => []);
let cur = [];

function dfs(end) {
  if (end === 9) {
    return;
  }

  let numbers = [1];
  let chars = [];
  let string = "1";
  for (let i = 0; i < end; i++) {
    let number = i + 2;
    let char = cur[i];
    //'+'
    if (char === 0) {
      numbers.push(number);
      chars.push(char);
      string += `${"+"}${number}`;
    }
    //'-'
    else if (char === 1) {
      numbers.push(number);
      chars.push(char);
      string += `${"-"}${number}`;
    }
    //' '
    else {
      let lastIndex = numbers.length - 1;
      numbers[lastIndex] = Number(String(numbers[lastIndex]) + String(number));
      string += `${" "}${number}`;
    }
  }

  let result = numbers[0];
  for (let i = 0; i < chars.length; i++) {
    let number = numbers[i + 1];
    let char = chars[i];
    if (char === 0) {
      result += number;
    } else if (char === 1) {
      result -= number;
    }
  }

  if (result === 0) {
    list[end].push(string);
  }

  for (let i = 0; i < 3; i++) {
    cur.push(i);
    dfs(end + 1);
    cur.pop();
  }
}

dfs(0);

for (let x of arr) {
  answer += list[x - 1].sort().join("\n");
  answer += "\n\n";
}

console.log(answer);

~~~
