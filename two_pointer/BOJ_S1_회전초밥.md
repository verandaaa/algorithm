https://www.acmicpc.net/problem/2531

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, d, k, c] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

let map = new Map(); //이번 라인에서 먹은 초밥

//컨베이어 벨트 시작 k-1개
for(let i=0;i<k-1;i++){
  map.set(arr[i], map.get(arr[i])+1 || 1);
}

//이제부터 하나씩 이동 시작
for(let i=k-1;i<k-1+n;i++){
  let last = i%n;
  //하나 먹고
  map.set(arr[last], map.get(arr[last])+1 || 1);
  //세고
  let count = map.size + (!map.has(c) ? 1 : 0)
  answer = Math.max(answer, count);
  //처음꺼 버리고
  let first = (last+n-k+1)%n;
  map.set(arr[first], map.get(arr[first])-1);
  if(map.get(arr[first])===0){
    map.delete(arr[first]);
  }
}


console.log(answer);

~~~
