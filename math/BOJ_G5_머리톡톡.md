https://www.acmicpc.net/problem/1241

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = "";

//존재하는 수의 개수를 센다
let numberCount = new Array(1000001).fill(0);
for (let x of arr) {
  numberCount[x]++;
}

//존재하는 수에 대해서 약수의 개수 구한다
let yaksuCount = new Array(1000001).fill(-1);
for (let x of arr) {
  //이미 구했으면 pass
  if (yaksuCount[x] !== -1) {
    answer += yaksuCount[x] - 1 + "\n";
    continue;
  }
  yaksuCount[x] = 0;
  //1부터 루트를 씌운 수 까지만 검사하면 된다
  for (let k = 1; k * k <= x; k++) {
    //나누어 떨어지는 수 발견
    if (x % k === 0) {
      //일반 수 ex) 2*8 = 16
      if (x / k !== k) {
        yaksuCount[x] += numberCount[k] + numberCount[x / k];
      }
      //제곱 수 ex) 4*4 = 16
      else {
        yaksuCount[x] += numberCount[k];
      }
    }
  }
  //나 자신은 빼고
  answer += yaksuCount[x] - 1 + "\n";
}

console.log(answer);

~~~
