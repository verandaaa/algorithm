https://www.acmicpc.net/problem/10942

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let [m] = input[2].split(" ").map(Number);
let qst = input.slice(3, input.length).map((v) => v.split(" ").map(Number));

//<------------input
let answer = "";
let list = Array.from(Array(n), () => Array(n).fill(false));

// console.log(list);

//팰린드롬 확인 배열 만들기
for (let i = 0; i < n; i++) {
  //홀수 길이
  let left = i;
  let right = i;
  while (left >= 0 && right < n && arr[left] === arr[right]) {
    list[left][right] = true;
    left--;
    right++;
  }
}
for (let i = 0; i < n - 1; i++) {
  //짝수 길이
  let left = i;
  let right = i + 1;
  while (left >= 0 && right < n && arr[left] === arr[right]) {
    list[left][right] = true;
    left--;
    right++;
  }
}

// console.log(list);
// console.log(qst); //[ [ 1, 3 ], [ 2, 5 ], [ 3, 3 ], [ 5, 7 ] ]

for (let [s, e] of qst) {
  //질문에 대해
  if (list[s - 1][e - 1]) {
    //팰린드롬 목록에 포함되어 있다면
    answer += "1\n";
  } else {
    answer += "0\n";
  }
}

console.log(answer);

~~~

어려운 문제는 아니었는데... 황당한 일이...  
마지막에 let [s, e] of qst 부분에서 런타임에러가 발생해서 해결을 못하다가  
of 대신에 범위는 인덱스로 m까지 for문 돌려봤더니 통과가 됐다  
그 뜻은 qst의 원소들을 도는데 s, e가 뭔가 잘못됐다는것이고 그 뜻은 qst에 이상한 값이 섞여들어간다는 것  
qst를 3부터 3+m까지 slice했더니 문제가 발생하지 않았다. input.length까지 slice하면서 공백이 섞여 들어간 듯 하다  
그래서 input에 trim()을 넣었더니 input.length로 돌려도 문제가 발생하지 않게 되었다   
