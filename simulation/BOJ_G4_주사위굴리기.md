https://www.acmicpc.net/problem/14499

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, x, y, k] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr = input[1 + n].split(" ").map(Number);
//<------------input
let answer = "";

class Dice {
  constructor(cur, left, right, up, down, opposite) {
    this.cur = cur;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    this.opposite = opposite;
  }
}

let diceValue = new Array(7).fill(0);
let dice = new Dice(1, 4, 3, 2, 5, 6);

let dx = [0, 0, 0, -1, 1];
let dy = [0, 1, -1, 0, 0];

for (let d of arr) {
  //다음 위치 갈 수 있는가
  let nx = x + dx[d];
  let ny = y + dy[d];

  if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
    continue;
  }
  x = nx;
  y = ny;

  //주사위 굴려서 정보 갱신하기
  let newDice = new Dice(dice.cur, dice.left, dice.right, dice.up, dice.down, dice.opposite);
  if (d === 1) {
    newDice.cur = dice.left;
    newDice.left = dice.opposite;
    newDice.right = dice.cur;
    newDice.opposite = dice.right;
  } //
  else if (d === 2) {
    newDice.cur = dice.right;
    newDice.left = dice.cur;
    newDice.right = dice.opposite;
    newDice.opposite = dice.left;
  } //
  else if (d === 3) {
    newDice.cur = dice.down;
    newDice.up = dice.cur;
    newDice.down = dice.opposite;
    newDice.opposite = dice.up;
  } //
  else if (d === 4) {
    newDice.cur = dice.up;
    newDice.up = dice.opposite;
    newDice.down = dice.cur;
    newDice.opposite = dice.down;
  }
  dice = newDice;

  //지도에 맞대서 값 복사하기
  if (map[x][y] === 0) {
    map[x][y] = diceValue[dice.opposite];
  } //
  else {
    diceValue[dice.opposite] = map[x][y];
    map[x][y] = 0;
  }

  answer += diceValue[dice.cur] + "\n";
}

console.log(answer);

~~~
