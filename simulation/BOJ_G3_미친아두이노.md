https://www.acmicpc.net/problem/8972

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(""));
let arr = input[1 + n].split("").map(Number);
//<------------input
let answer;

let dx = [0, 1, 1, 1, 0, 0, 0, -1, -1, -1];
let dy = [0, -1, 0, 1, -1, 0, 1, -1, 0, 1];

//종수의 좌표
let mePos;
//미친 아두이노의 좌표
let youPos = [];
//살아있는 미친 아두이노 번호
let youNum = [];
//칸에 존재하는 아두이노 번호
let isDanger = new Array(n).fill().map(() => new Array(m).fill().map(() => []));

class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//초기값 저장
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "I") {
      mePos = new Pos(i, j);
    } else if (map[i][j] === "R") {
      youPos.push(new Pos(i, j));
      isDanger[i][j].push(youNum.length);
      youNum.push(youNum.length);
    }
  }
}

loop: for (let t = 0; t < arr.length; t++) {
  //먼저, 종수가 아두이노를 8가지 방향(수직,수평,대각선)으로 이동시키거나, 그 위치에 그대로 놔둔다.
  mePos.x += dx[arr[t]];
  mePos.y += dy[arr[t]];
  //종수의 아두이노가 미친 아두이노가 있는 칸으로 이동한 경우에는
  //게임이 끝나게 되며, 종수는 게임을 지게 된다.
  if (isDanger[mePos.x][mePos.y].length !== 0) {
    answer = "kraj " + (t + 1);
    break loop;
  }
  //willDanger 쓰는 이유 -> 이전까지 위험했던 지역이랑, 이제 위험해지는 지역을 구분하기 위해서
  let willDanger = new Array(n).fill().map(() => new Array(m).fill().map(() => []));
  //미친 아두이노는 8가지 방향 중에서 종수의 아두이노와 가장 가까워 지는 방향으로 한 칸 이동한다.
  for (let you of youNum) {
    if (mePos.x < youPos[you].x) {
      youPos[you].x--;
    } else if (mePos.x > youPos[you].x) {
      youPos[you].x++;
    }
    if (mePos.y < youPos[you].y) {
      youPos[you].y--;
    } else if (mePos.y > youPos[you].y) {
      youPos[you].y++;
    }
    //willDanger 추가
    willDanger[youPos[you].x][youPos[you].y].push(you);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (willDanger[i][j].length > 0) {
        //미친 아두이노가 종수의 아두이노가 있는 칸으로 이동한 경우에는
        //게임이 끝나게 되고, 종수는 게임을 지게 된다.
        if (mePos.x === i && mePos.y === j) {
          answer = "kraj " + (t + 1);
          break loop;
        }
        //2개 또는 그 이상의 미친 아두이노가 같은 칸에 있는 경우에는
        //큰 폭발이 일어나고, 그 칸에 있는 아두이노는 모두 파괴된다.
        if (willDanger[i][j].length > 1) {
          for (let you of willDanger[i][j]) {
            youNum.splice(youNum.indexOf(you), 1);
          }
          willDanger[i][j] = [];
        }
      }
    }
  }
  isDanger = willDanger;
}

//정답 구조 만들기
if (!answer) {
  answer = new Array(n).fill().map(() => new Array(m).fill("."));
  answer[mePos.x][mePos.y] = "I";
  for (let you of youNum) {
    answer[youPos[you].x][youPos[you].y] = "R";
  }
  answer = answer.map((line) => line.join("")).join("\n");
}

console.log(answer);

~~~
