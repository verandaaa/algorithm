https://www.acmicpc.net/problem/21315

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = "";

let cards;

loop: for (let k1 = 1; 2 ** k1 < n; k1++) {
  for (let k2 = 1; 2 ** k2 < n; k2++) {
    //카드 만들기
    cards = new Array(n).fill().map((_, index) => index + 1);

    //k1에 대해 수행
    cards = shuffle(k1);

    //k2에 대해 수행
    cards = shuffle(k2);

    //arr과 비교
    let flag = true;
    for (let i = 0; i < n; i++) {
      if (cards[i] !== arr[i]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      answer = k1 + " " + k2;
      break loop;
    }
  }
}

function shuffle(k) {
  let newCards = [];

  //1 (2345 (67 (8 (9
  //뒤에서부터 1, 2, 4, 8 ... 끝는 규칙을 찾았다.
  let right = 0;
  for (let i = 0; i <= k; i++) {
    let left = 2 ** i;
    newCards = newCards.concat(cards.slice(n - left, n - right));

    right = left;
  }
  newCards = newCards.concat(cards.slice(0, n - right));

  return newCards;
}

console.log(answer);

~~~
