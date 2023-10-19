https://www.acmicpc.net/problem/1038

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let list = Array.from(Array(10), (_, i) => i);
let prev = Array.from(Array(10), (_, i) => i);
let c = 1; //곱하는 자리수에 대한 상수
loop: while (list[list.length - 1] !== 9876543210) {
  //가장 큰 수 등장 전까지만
  let cur = [];
  for (let i = 1; i <= 9; i++) {
    //붙일 앞 자리 수
    for (let x of prev) {
      if (i > Math.floor(x / c)) {
        //내 이전 배열의 앞 자리보다 클 경우만
        let s = c * 10 * i + x; //이어 붙이기
        list.push(s);
        cur.push(s);
        if (list.length === n + 1) {
          //목표 달성
          break loop;
        }
      } else {
        //다음 앞 자리수로 넘어가기
        break;
      }
    }
  }
  prev = cur; //내 이전 배열 업데이트
  c *= 10; //곱하는 자리수에 대한 상수 증가
}
answer = list[n] !== undefined ? list[n] : -1; //있는 경우에만

console.log(answer);

~~~
|      |      |      |      |      |      |      |      |    |    |    |    |    |    |    |   |    |
|------|------|------|------|------|------|------|------|----|----|----|----|----|----|----|---|----|
| 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8  | 9  |    |    |    |    |    |   |    |
| 10   | 20   | 21   | 30   | 31   | 32   | 40   | 41   | 42 | 43 | 50 | 51 | 52 | 53 | 54 | ~ |    |
| 210  | 310  | 320  | 321  | 430  | 431  | 432  | ~    |    |    |    |    |    |    |    |   |    |
| 3210 | 4310 | 4320 | 4321 | 5210 | 5310 | 5320 | 5321 | ~  |    |    |    |    |    |    |   |    |
