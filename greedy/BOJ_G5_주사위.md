https://www.acmicpc.net/problem/1041

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

if (n === 1) {
  answer = arr.reduce((acc, value) => acc + value, 0) - Math.max(...arr);
  console.log(answer);
  return;
}

let onePosition = [[0], [1], [2], [3], [4], [5]];
let twoPosition = [
  [0, 3],
  [0, 4],
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 5],
  [1, 2],
  [5, 2],
  [5, 4],
  [5, 3],
  [4, 3],
  [4, 2],
];
let threePosition = [
  [0, 3, 1],
  [0, 3, 4],
  [0, 4, 2],
  [0, 1, 2],
  [1, 3, 5],
  [1, 5, 2],
  [5, 2, 4],
  [5, 4, 3],
];
let position = [onePosition, twoPosition, threePosition];

// let totalCount = n * n * n;
// let zeroCount = (n - 2) * (n - 2) * (n - 1);
let threeCount = 4;
let twoCount = 4 + 8 * (n - 2);
// let oneCount = totalCount - zeroCount - threeCount - twoCount;
let oneCount = 4 * (n - 2) * (n - 1) + (n - 2) * (n - 2);

let count = [oneCount, twoCount, threeCount];

for (let i = 0; i < 3; i++) {
  let min = Infinity;
  for (let p of position[i]) {
    let sum = p.reduce((acc, index) => acc + arr[index], 0);
    min = Math.min(min, sum);
  }
  answer += count[i] * min;
}

console.log(answer);

~~~

완성된 정육면체의 밑면은 볼 수 없음에 유의  
세군데 보이는 조각, 두군데 보이는 조각, 한군데 보이는 인덱스를 메모해서 값을 구하고, 개수를 곱한다  
totalCount는 BigInt 범위를 넘어가므로 oneCount를 직접 구하는것이 낫다  
