https://www.acmicpc.net/problem/11726

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let arr = new Array(n + 1).fill(0);
arr[1] = 1;
arr[2] = 2;
for (let i = 3; i < n + 1; i++) {
  arr[i] = (arr[i - 1] + arr[i - 2]) % 10007;
}
answer = arr[n];

console.log(answer);

~~~

n=1 : " l "   
n=2 : " ll ", " = "   
n=3 : " lll " , " l= ", " =l "  
n=4 : " llll ", " l=l ", " =ll ", " ll= ", == "  
  
4로 생각을 해보자...  
3일때의 상태에서 2x1만큼이 더 필요하니 " l " 만 붙이고,  
2일때의 상태에서 2x2만큼이 더 필요하니 " = " 만 붙인다.  ( " ll " 의 형태는 이미 3일때 포함 시킴)  
따라서 위와 같은 점화식이 만들어짐  
