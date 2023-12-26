https://www.acmicpc.net/problem/3343

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, a, b, c, d] = input[0].split(" ").map(Number);
//<------------input
let answer = Infinity;

//a,b가 비싼곳(A) / c,d가 싼곳(B)
if (b / a < d / c) {
  [a, b, c, d] = [c, d, a, b];
}

for (let i = 0; i < c; i++) { //A에서 몇번 구매? (A에서 구매하는 총 개수는 a x c 미만이 되어야함)
  let j = Math.ceil((n - i * a) / c); //B에서 몇번 구매?
  if (j < 0) {
    j = 0;
  }
  answer = Math.min(answer, i * b + j * d);
}

console.log(answer);

~~~

무조건 싼곳에서 최대한 많이 사고 나머지를 채우는 것은 아니다  
a x c만큼 구매할때는 싼곳에서 사는게 더 싸기 때문에   
확신 할 수 있는 것은 비싼곳에서 a x c 이상으로 구매할 일은 절대 없다는 것이다  
어려웠던 문제 ㅠㅠ  
참고 : https://velog.io/@alswndit/%EB%B0%B1%EC%A4%80-3343%EB%B2%88-%EC%9E%A5%EB%AF%B8-G4  
