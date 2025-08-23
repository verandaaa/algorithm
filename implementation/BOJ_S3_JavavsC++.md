https://www.acmicpc.net/problem/3613

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let str = input[0];
//<------------input
let answer = "Error!";

//error
if (str.includes("_") && /[A-Z]/.test(str)) {
  //
}
//java
else if (str.includes("_")) {
  let words = str.split("_");
  let res = "";
  let isError = false;
  for (let word of words) {
    //_a___b_ 같은 입력
    if (!word) {
      isError = true;
      break;
    }
    let newWord = word;
    res += newWord[0].toUpperCase() + newWord.substring(1, newWord.length);
  }
  if (!isError) {
    res = res[0].toLowerCase() + res.substring(1, res.length);
    answer = res;
  }
}
//c++
else {
  let res = "";
  let isError = false;
  //Abcde 같은 입력
  if (/[A-Z]/.test(str[0])) {
    isError = true;
  }
  for (let x of str) {
    if (x >= "A" && x <= "Z") {
      res += "_";
    }
    res += x.toLowerCase();
  }
  if (!isError) {
    answer = res;
  }
}

console.log(answer);

~~~
