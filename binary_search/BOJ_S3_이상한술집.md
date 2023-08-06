https://www.acmicpc.net/problem/13702

# Solution 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr = input.slice(1, input.length).map((v) => v * 1);

//<------------input
let answer = 0;
let left = 1;
let right = Math.max(...arr); //최대 가능성

while (left<=right) {
  let mid = Math.floor((left + right) / 2);
  let result = check(mid);

  if (result === "OO") {
    //둘다 가능
    left = mid + 1;
  } else if (result === "XX") {
    //둘다 불가능
    right = mid - 1;
  } else {
    //하나 가능, 하나 불가능 (정답)
    answer = mid;
    break;
  }
}
//1조차도 부족하면 while(left<=right)에서 break해서 0이 답이 된다

function check(mid) {
  let sum1 = 0,
    sum2 = 0;
  for (let x of arr) {
    sum1 += Math.floor(x / mid);
    sum2 += Math.floor(x / (mid + 1));
  }
  if (sum1 >= m && sum2 >= m) {
    return "OO";
  }
  if (sum1 < m && sum2 < m) {
    return "XX";
  }
  return "OX";
}

console.log(answer);

~~~

right는 arr의 min 값이 아니라 max 값이다(주전자가 100000 1 1 일 경우)  
left는 1로 시작하게 한다. 어차피 right가 0이면(max=0) answer은 0으로 끝난다  
무슨 일이 있어도 0으로 나누어지는 일이 없도록 한다...  
