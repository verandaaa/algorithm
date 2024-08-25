https://www.acmicpc.net/problem/7795

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = [];

for (let tc = 0; tc < t; tc++) {
  let arr1 = input[tc * 3 + 2].split(" ").map(Number);
  let arr2 = input[tc * 3 + 3].split(" ").map(Number);

  //내림차순 정렬
  arr1.sort((a, b) => b - a);
  arr2.sort((a, b) => b - a);

  let count = 0;
  //a를 기준으로 했을때
  for (let a of arr1) {
    let jStart = 0;
    //잡아먹을 수 있는 최대 크기의 b 물고기를 찾는다
    for (let j = jStart; j < arr2.length; j++) {
      let b = arr2[j];
      if (a > b) {
        count += arr2.length - j;
        jStart = j;
        break;
      }
    }
  }

  answer.push(count);
}
answer = answer.join("\n");

console.log(answer);

~~~

누적합으로도 구할 수 있다고 생각했으나, N,M의 범위가 물고기 크기가 아니라 물고기 개수였다   
따라서 물고기의 크기를 알 수 없으므로 누적합이 불가능한다  
