https://www.acmicpc.net/problem/6137

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
// let arr = input[1].split(" ");

//<------------input
let answer = "";
let count = 0;

let left = 0;
let right = n - 1;
while (left <= right) {
  //왼쪽이 더 작다
  if (arr[left] < arr[right]) {
    answer += arr[left++];
  }
  //오른쪽이 더 작다
  else if (arr[left] > arr[right]) {
    answer += arr[right--];
  }
  //왼쪽 오른쪽 같다 (CABKAC)
  else {
    let [left2, right2] = [left, right];
    let flag = false;
    //같지 않은 지점까지 껍데기를 깐다
    while (left2 <= right2) {
      //왼쪽이 더 작다
      if (arr[left2] < arr[right2]) {
        answer += arr[left++];
        flag = true;
        break;
      }
      //오른쪽이 더 같다
      else if (arr[left2] > arr[right2]) {
        answer += arr[right--];
        flag = true;
        break;
      }
      left2++;
      right2--;
    }
    //반복문을 깰 때까지 전부 같으면 아무 쪽이나
    if (!flag) {
      answer += arr[left++];
    }
  }
  count++;
  if (count % 80 === 0) {
    answer += "\n";
  }
}

console.log(answer);

~~~
