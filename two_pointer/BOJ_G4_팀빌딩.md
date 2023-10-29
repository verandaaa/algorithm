https://www.acmicpc.net/problem/22945

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let left = 0;
let right = n - 1;

while (left <= right) {
  answer = Math.max(
    answer,
    (right - left - 1) * Math.min(arr[left], arr[right])
  );

  if (arr[left] < arr[right]) {
    left++;
  } else {
    right--;
  }
}

console.log(answer);

~~~

3 4 2 5 의 arr이 주어질때 왼쪽값은 3이고 오른쪽값은 5이다  
여기서 3<5 인데, 3은 앞으로 포함하더라도 오른쪽에 어떤 수가 있더라도 최대값이 [3,5]를 넘을 수 없다  
왜냐하면 거리가 줄어들고, 두 값중 최소을 취하기 때문에 오른쪽에 100이 있어도 3이고, 오른쪽에 1이 있다면 1이고  
따라서 왼쪽수(작은수)를 버린다.
