https://www.acmicpc.net/problem/2110

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//let arr = input.slice(1, 1+n).map((v) => v.split(" ").map(Number));
//<------------input

let answer = 0;

arr.sort((a, b) => a - b);

let left = 1; //최소 거리
let right = arr[arr.length - 1] - arr[0]; //최대거리

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let count = 1;
  let last = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[last] + mid <= arr[i]) {
      //최소 mid만큼 띄울 경우
      last = i;
      count++;
    }
  }
  //딱 맞는 공유기가 나올때까지 계속 돌림.
  //공유기가 넘치는 경우는 상관 없다.어차피 정답보다 mid가 작은 값을 가지니까
  if (count >= m) {
    left = mid + 1;
    answer = mid;
  }
  //공유기가 부족할 경우 정답보다 mid가 크기 때문에 right만 줄여줌
  else {
    right = mid - 1;
  }
}

console.log(answer);

~~~

1 2 4 8 9 일때 left=1, right=8로 시작한다  
mid=4일때 1 8 두개밖에 설치가 안되므로 right=3  
mid=2일때 1 4 8 세개 설치가 가능하므로 left=3  
mid=3일때 1 4 8 세개 설치가 가능하므로 left=4  
while문 종료  
만약 mid=1일때 1 2 4 8 9 다섯개 설치하므로 left=2  
어차피 가능한 최대의 mid를 찾아서 while문에 계속 돌게 된다  
이상한 술집 문제를 풀 당시 mid와 mid+1을 기준으로 둘다 되면 left변화, 둘다 안되면 right변화, mid는되고 mid+1은 안되면 정답  
이런식으로 최대 mid를 찾았었는데 그 문제 또한 이 풀이대로 풀었으면 된다는걸 알았다  
이분탐색을 사용해야하는가를 고민해야할 때는  
무언가 분배해야할 때, 특정한 기준을 찾아야할 때 인 것 같다  
