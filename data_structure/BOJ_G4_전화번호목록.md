https://www.acmicpc.net/problem/5052

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let inputIndex = 1;
for (let tc = 0; tc < t; tc++) {
  let result = "YES";

  let [n] = input[inputIndex].split(" ").map(Number);
  inputIndex++;
  let arr = input.slice(inputIndex, inputIndex + n);
  inputIndex += n;

  let set = new Set(arr); //전화번호부
  loop: for (let str of arr) {
    let find = "";
    for (let i = 0; i < str.length - 1; i++) {
      //최대 10자리니까 한자리씩 추가해가면서 비교
      find += str[i];
      if (set.has(find)) {
        result = "NO";
        break loop;
      }
    }
  }

  answer += result + "\n";
}

console.log(answer);

~~~
