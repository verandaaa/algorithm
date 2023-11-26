https://www.acmicpc.net/problem/3107

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];
//<------------input
let answer = "";

//중간은 ::은 공백 한칸으로 구분되는데, 앞 뒤의 ::는 공백 두칸으로 구분되어서 하나 지워줌
if (string[0] === ":") {
  answer = string.substring(1, string.length);
} //
else if (string[string.length - 1] === ":") {
  answer = string.substring(0, string.length - 1);
} //
else {
  answer = string;
}

let index = -1; //0000을 채워넣을 위치
let count = 8; //0000을 채워넣을 횟수
answer = answer.split(":").map((v, i) => {
  if (v.length === 0) { //::자리 발견시
    index = i; //위치 저장
    return v;
  }
  count--; //횟수 감소
  return "0".repeat(4 - v.length) + v; //4자리 채움
});

index = index === -1 ? answer.length : index; //::이 없었다면 index를 최대로
let add = new Array(count).fill("0000");
answer = [
  ...answer.slice(0, index), //::이 없다면 여기까지 하고 끝남
  ...add, //::이 있다면 이 위치에 추가
  ...answer.slice(index + 1, answer.length),
];

answer = answer.join(":");

console.log(answer);

~~~
