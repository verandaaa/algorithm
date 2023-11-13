https://www.acmicpc.net/problem/20366

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = Infinity;

class Obj {
  constructor(a, b, sum) {
    this.a = a;
    this.b = b;
    this.sum = sum;
  }
}

//인덱스, 합을 담은 배열 구하기
let objs = [];
for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    objs.push(new Obj(i, j, arr[i] + arr[j]));
  }
}
//배열 정렬
objs.sort((a, b) => a.sum - b.sum);
//한칸씩 이동하면서 최소값 체크
for (let i = 0; i < objs.length - 1; i++) {
  //단 인덱스가 겹치면 안됨
  if (objs[i].a === objs[i + 1].a) {
    continue;
  }
  if (objs[i].a === objs[i + 1].b) {
    continue;
  }
  if (objs[i].b === objs[i + 1].a) {
    continue;
  }
  if (objs[i].b === objs[i + 1].b) {
    continue;
  }
  answer = Math.min(answer, objs[i + 1].sum - objs[i].sum);
}

console.log(answer);

~~~
방법1 : 합을 조합해서 정렬하고 한칸씩 이동하며 차를 구하기. 단 인덱스는 겹치면 안된다

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = Infinity;

arr.sort((a, b) => a - b);

for (let l = 0; l < n; l++) {
  for (let r = l + 3; r < n; r++) { //가운데 최소 2자리 필요해서 +3
    let sum1 = arr[r] + arr[l];
    let [i, j] = [l + 1, r - 1]; //i와 j는 l고 r 사이에 존재
    while (i < j) {
      let sum2 = arr[i] + arr[j];
      answer = Math.min(answer, Math.abs(sum1 - sum2));
      if (sum1 > sum2) {
        i++;
      } //
      else if (sum1 < sum2) {
        j--;
      } //
      else {
        break;
      }
    }
  }
}

console.log(answer);

~~~
방법2 : 겉으로 조합을 만들고, 그 사이 값만 사용해서 투포인터로 최소차이값 찾기
