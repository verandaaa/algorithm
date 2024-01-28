https://www.acmicpc.net/problem/20665

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, t, p] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + t).map((v) => v.split(" "));
//<------------input
let answer = 0;

//예약표를 분 형식으로 변형
let totalList = arr.map(([start, end]) => {
  let cStart = start.substring(0, 2) * 60 + start.substring(2, 4) * 1;
  let cEnd = end.substring(0, 2) * 60 + end.substring(2, 4) * 1;

  return [cStart, cEnd];
});

//1순위 빠른 시작시간, 2순위 적은 이용시간
totalList.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - a[0] - (b[1] - b[0]);
  }
  return a[0] - b[0];
});

//방의 입실 여부
let check = new Array(n + 1);
//입실중인 사람들 리스트
let ingList = [];

//오픈시간 ~ 마감시간
for (let time = 540; time < 1260; time++) {
  //예약자가 안에 존재했고, 퇴실 시간이 되었다
  ingList.sort((a, b) => a[1] - b[1]);
  while (ingList.length > 0 && ingList[0][1] === time) {
    //방 비우기
    check[ingList[0][0]] = false;
    //퇴실
    ingList.shift();
  }

  //예약자가 남았고, 입실 시간이 되었다
  while (totalList.length > 0 && totalList[0][0] === time) {
    //만약 입실시간과 퇴실시간이 같다면 없던 것으로 처리
    if (totalList[0][1] === time) {
      totalList.shift();
      continue;
    }

    //입실할 방 번호 찾기
    let number;
    let max = 0;
    //아무도 없으면 1번자리
    if (ingList.length === 0) {
      number = 1;
    }
    //먼 자리 고르기
    else {
      let [left, right] = [null, null];
      for (let room = 1; room <= n; room++) {
        if (check[room]) {
          //1.시작점에 앉는 경우
          if (left === null && right === null) {
            right = room;
            max = right - 1;
            number = 1;
          }
          //2. 두 사람 사이에 앉는 경우
          else {
            left = right;
            right = room;
            if (Math.floor((right - left) / 2) > max) {
              max = Math.floor((right - left) / 2);
              number = left + max;
            }
          }
        }
      }
      //3. 끝점에 앉는 경우
      left = right;
      right = n;
      if (right - left > max) {
        number = right;
      }
    }
    check[number] = true;
    //입실하기
    ingList.push([number, totalList[0][1]]);
    //예약리스트 삭제
    totalList.shift();
  }
  //민규가 이용 가능?
  if (!check[p]) {
    answer++;
  }
}

console.log(answer);

~~~
