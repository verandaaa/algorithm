https://www.acmicpc.net/problem/5639

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.map(Number);
//<------------input
let answer = [];

postOrder(0, arr.length - 1);

function postOrder(s, e) {
  if (s > e) {
    //더 이상 갈 구역이 없다
    return;
  }

  let point = s + 1; //경계 지점 찾기
  while (point <= e && arr[point] < arr[s]) {
    point++;
  }
  postOrder(s + 1, point - 1); //왼쪽 구역으로
  postOrder(point, e); //오른쪽 구역으로
  answer.push(arr[s]);
}
answer = answer.join("\n");

console.log(answer);

~~~
