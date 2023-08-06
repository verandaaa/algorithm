https://www.acmicpc.net/problem/3005

# Solution 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr1 = input.slice(1, input.length);

//<------------input
let answer = [];
let arr2 = [];
for (let i = 0; i < m; i++) {
  //세로방향 string 배열 만들기
  let str = "";
  for (let j = 0; j < n; j++) {
    str += arr1[j][i];
  }
  arr2.push(str);
}
for (let i = 0; i < n; i++) {
  //가로 워드
  let arr3 = arr1[i].split("#").filter((x) => x.length >= 2);
  answer = answer.concat(arr3);
}
for (let i = 0; i < m; i++) {
  //세로 워드
  let arr3 = arr2[i].split("#").filter((x) => x.length >= 2);
  answer = answer.concat(arr3);
}
//#을 기준으로 스플릿하여 길이가 2 이상인 문자만 배열에 추가한다

answer.sort();
answer = answer[0];

console.log(answer);

~~~
