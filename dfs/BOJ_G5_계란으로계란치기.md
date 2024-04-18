https://www.acmicpc.net/problem/16987

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

class Egg {
  constructor(life, attack) {
    this.life = life;
    this.attack = attack;
  }
}

let eggs = arr.map((v) => new Egg(v[0], v[1]));

dfs(0);

function dfs(left) {
  //더 이상 왼손에 들 달걀이 없다
  if (left === n) {
    //깨진 달걀의 개수를 센다
    let count = eggs.filter((egg) => egg.life <= 0).length;
    answer = Math.max(answer, count);
    return;
  }
  //왼손에 든 달걀에 깨졌으면 다음 달걀을 왼쪽 손에 든다
  if (eggs[left].life <= 0) {
    dfs(left + 1);
    return;
  }
  //공격 대상의 달걀 고르기
  let flag = false;
  for (let i = 0; i < n; i++) {
    //왼손에 들지 않은 달걀이어야 하머 이미 깨진 달걀이면 안된다
    if (left === i || eggs[i].life <= 0) {
      continue;
    }
    //닿은 두 달걀의 목숨을 깎는다
    flag = true;
    eggs[left].life -= eggs[i].attack;
    eggs[i].life -= eggs[left].attack;
    dfs(left + 1);
    eggs[left].life += eggs[i].attack;
    eggs[i].life += eggs[left].attack;
  }
  //공격할 달걀이 없어도 왼손은 옮겨간다
  if (!flag) {
    dfs(left + 1);
  }
}

console.log(answer);

~~~

유의할 점 :  
더 이상 왼손에 들 달걀이 없어야 게임이 종료되고 깨진 달걀의 개수를 센다  
즉, 무슨 일이 있어도 끝까지 가야한다  
따라서 왼손에 들 달걀이 깨졌든, 다 깨져서 공격할 달걀이 하나도 없든 왼손은 이동해야 한다  
