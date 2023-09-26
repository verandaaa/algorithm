https://www.acmicpc.net/problem/1188

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;
if (n / m === 0) {
  console.log(answer);
  return;
}

for (let i = 1; ; i++) {
  if (((n / m) * i) % 1 === 0) {
    //정수면
    answer = (n / ((n / m) * i)) * (i - 1);
    break;
  }
}

console.log(answer);
~~~

1. 인당 가져가야 하는 빵의 양 n/m을 정수로 만드는 i(토막수)를 구한다  
2. 1번의 값이 현재 처리한 소세지의 개수이다  
3. 따라서 가지고 있는 소세지 만큼 처리할 수 있도록 나눈다  
4. 3번 값 x 몇 번 잘랐는가 = 정답
  
  
다른 풀이로는 m-최대공약수(n,m)을 하면 된다  
