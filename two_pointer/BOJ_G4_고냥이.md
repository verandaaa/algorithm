https://www.acmicpc.net/problem/16472

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let string = input[1];
//<------------input
let answer = 0;

let map = new Map();
let left = 0;
//테일을 이동시키기
for (let right = 0; right < string.length; right++) {
  //맵에 이미 존재하면 횟수만 늘리고 끝
  if (map.has(string[right])) {
    map.set(string[right], map.get(string[right]) + 1);
  }
  //맵에 존재하지 않은 문자이다
  else {
    //일단 추가하고
    map.set(string[right], 1);

    //만약에 크기 n을 넘긴다면
    while (map.size > n) {
      //횟수를 하나 줄이고
      map.set(string[left], map.get(string[left]) - 1);
      //횟수가 0이면 삭제
      if (map.get(string[left]) === 0) {
        map.delete(string[left]);
      }
      //헤드 이동
      left++;
    }
  }
  //테일-헤드+1이 길이
  answer = Math.max(answer, right - left + 1);
}

console.log(answer);

~~~
