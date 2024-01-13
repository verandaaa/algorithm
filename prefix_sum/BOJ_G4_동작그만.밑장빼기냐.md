https://www.acmicpc.net/problem/20159

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let jjak = [0];
let hol = [0];

for (let i = 0; i < n; i++) {
  if (i % 2 === 0) {
    hol.push(hol[i] + arr[i]);
    jjak.push(jjak[i]);
  } //
  else {
    jjak.push(jjak[i] + arr[i]);
    hol.push(hol[i]);
  }
}

answer = hol[n];

//밑장빼기 지점은 i
for (let i = 1; i <= n; i++) {
  let me = 0;
  //1번 ~ i-1번 - 나 : 짝, 너 : 홀
  me += hol[i - 1] - hol[0]
  //i번 ~ n-1번 - 나 : 홀, 너 : 짝
  me += (jjak[n - 1] - jjak[i - 1]);
  //n번 - 턴% 인 사람이 먹기
  me += i % 2 === 1 ? arr[n - 1] : 0;

  answer = Math.max(answer, me);
}

console.log(answer);

//1턴에 밑장빼기 -  21212 1
//2턴에 밑장빼기 - 1 1212 2
//3턴에 밑장빼기 - 12 212 1
//4턴에 밑장빼기 - 121 12 2
//5턴에 밑장빼기 - 1212 2 1
//밑장빼기 x - 121212 

~~~
