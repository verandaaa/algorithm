https://www.acmicpc.net/problem/1082

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let [m] = input[2].split(" ").map(Number);
//<------------input
let answer = "";

//제일 싸면서 큰 숫자, 그다음 싸면서 큰 숫자 구하기
let maxNum = [-1, -1];
let minPrice = [Infinity, Infinity];
for (let i = 0; i < n; i++) {
  if (arr[i] <= minPrice[0]) {
    minPrice[1] = minPrice[0];
    maxNum[1] = maxNum[0];
    minPrice[0] = arr[i];
    maxNum[0] = i;
  } //
  else if (arr[i] <= minPrice[1]) {
    minPrice[1] = arr[i];
    maxNum[1] = i;
  }
}
//console.log(maxNum, minPrice);

//자리수가 가장 길게 만들기
let roomNum = [];
//단, 제일 싼 숫자가 0이면
if (maxNum[0] === 0) {
  //맨 앞자리가 0이 아니게 하는 두번째로 싼 숫자로 교체
  if (m >= minPrice[1]) {
    roomNum.push(maxNum[1]);
    m -= minPrice[1];
  }
  //못산다면 그냥 0임
  else {
    roomNum.push(0);
    m -= arr[0];
  }
}
//나머지 자리를 제일 싼 숫자로 채우기
if (roomNum[0] !== 0) {
  for (let i = 0; i < Math.floor(m / arr[maxNum[0]]); i++) {
    roomNum.push(maxNum[0]);
  }
  m %= arr[maxNum[0]];
}
// console.log(roomNum, m);

//맨 앞부터 한자리씩 검사
for (let i = 0; i < roomNum.length; i++) {
  //가장 큰 수 부터 여유돈 있으면 교체
  for (let j = n - 1; j >= 0; j--) {
    if (arr[roomNum[i]] + m >= arr[j]) {
      m += arr[roomNum[i]];
      m -= arr[j];
      roomNum[i] = j;
      break;
    }
  }
}
answer = roomNum.join("");

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let [m] = input[2].split(" ").map(Number);
//<------------input
let answer = "";

//제일 싸면서 큰 숫자 구하기
let maxNum = -1;
let minPrice = Infinity;
for (let i = 0; i < n; i++) {
  if (arr[i] <= minPrice) {
    minPrice = arr[i];
    maxNum = i;
  }
}

//자리수가 가장 길게 만들기
let roomNum = [];
for (let i = 0; i < Math.floor(m / arr[maxNum]); i++) {
  roomNum.push(maxNum);
}
m %= arr[maxNum];

//맨 앞부터 한자리씩 검사
let index = 0;
for (let i = 0; i < roomNum.length; i++) {
  //가장 큰 수 부터 여유돈 있으면 교체
  for (let j = n - 1; j >= 0; j--) {
    if (minPrice + m >= arr[j]) {
      m += minPrice;
      m -= arr[j];
      roomNum[i] = j;
      break;
    }
  }
  //맨 앞이 0이면 자리수 줄이면서 돈으로 교체
  if (roomNum[index] === 0) {
    m += minPrice;
    index++;
  }
}
//모든 자리수가 0이라면 답은 "0", 아니면 맨 앞자리부터 연속된 0을 제외하고 잇기
answer = index === roomNum.length ? "0" : roomNum.slice(index, roomNum.length).join("");

console.log(answer);

~~~

첫번째 풀이는 먼저 앞자리가 0이 아닌 긴 수로 만들고 그 다음에 교체를 했지만  
두번째 풀이는 상관없이 가장 긴 수를 만들고 앞자리가 0일때마다 환불하면서 교체  
