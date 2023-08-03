https://www.acmicpc.net/problem/5670

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let tc = [];
let len = 0;
while (len < input.length) {
  let n = input[len] * 1;
  let dictionary = input.slice(len + 1, len + 1 + n);
  len = len + 1 + n;

  tc.push([n, dictionary]);
}
//<------------input

let answer = "";

let values, edges;
for (let [n, dictionary] of tc) {
  //트리 구조 만들기
  values = ["S"];
  edges = [[]];
  for (let word of dictionary) {
    makeTree(word);
  }

  //횟수 세기
  let sum = calculateSum();
  let avg = (sum / n).toFixed(2);
  answer += avg + "\n";
}

console.log(answer);

function makeTree(word) {
  //saving
  //지점 찾기
  let nodeIndex = 0; //어디까지 일치했는가 sa
  let wordIndex = 0; //어디부터 붙이면 되는가 ving
  let queue = [nodeIndex]; //root부터 시작

  while (queue.length && wordIndex < word.length) {
    //hello hell 처럼 hell까지 다 찾은 경우 break
    let newQueue = [];

    for (let q of queue) {
      //현재 노드 root
      for (let nextIndex of edges[q]) {
        //다음 노드들 중에서(s,c,a,m,v,y,u,h)
        if (values[nextIndex] === word[wordIndex]) {
          //다음 노드 값 === 단어의 현재 위치 값(s===s)
          newQueue.push(nextIndex); //다음 노드 추가
          nodeIndex = nextIndex; //현재 노드를 다음 노드로 이동
          wordIndex++; //단어 다음 자리로
          break; //<-이거 빼먹어서 틀림.. sad가 root->s, root->a를 둘다 찾아서 한자리 찾으면 넘어가야함
        }
      }
    }

    queue = newQueue;
  }

  //노드 잇기
  for (let i = wordIndex; i < word.length; i++) {
    edges[nodeIndex].push(values.length); //끝과 새로운 노드 연결
    edges.push([]); //새로운 노드 생성
    nodeIndex = values.length; //마지막 노드 번호로 이동
    values.push(word[i]); //단어의 위치값 추가
  }
  edges[nodeIndex].push(values.length);
  edges.push([]);
  nodeIndex = values.length;
  values.push("E"); //끝남을 표시
}

function calculateSum() {
  let sum = 0;

  let queue = [];
  for (let i = 0; i < edges[0].length; i++) {
    queue.push([edges[0][i], 1]);
  }

  while (queue.length) {
    let newQueue = [];

    for (let [nodeIndex, count] of queue) {
      if (values[nodeIndex] === "E") {
        //끝 도착
        sum += count; //더함
      }

      let childCount = edges[nodeIndex].length; //자식의 수

      for (let i = 0; i < edges[nodeIndex].length; i++) {
        let childIndex = edges[nodeIndex][i]; //자식의 노드번호
        if (childCount === 1) {
          //자식이 1개면 gr -> o
          newQueue.push([childIndex, count]); //count 유지
        } else {
          //자식이 2 이상인데 hell -> o or E
          if (values[childIndex] === "E") {
            //끝자락이면 hell
            newQueue.push([childIndex, count]); //count 유지
          } else {
            //더 이어지면 hello
            newQueue.push([childIndex, count + 1]); //count + 1
          }
        }
      }
    }

    queue = newQueue;
  }

  return sum;
}

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let tc = [];
let len = 0;
while (len < input.length) {
  let n = input[len] * 1;
  let dictionary = input.slice(len + 1, len + 1 + n);
  len = len + 1 + n;

  tc.push([n, dictionary]);
}
//<------------input
class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

let answer = "";

let linkedList;
for (let [n, dictionary] of tc) {
  //트리 구조 만들기
  linkedList = new Node("root", []);
  for (let word of dictionary) {
    makeTree(word);
  }

  //횟수 세기
  let sum = calculateSum();
  let avg = (sum / n).toFixed(2);
  answer += avg + "\n";
}

console.log(answer);

function makeTree(word) {
  let wordIndex = 0;

  //트리만들기
  let cur = linkedList;
  while (cur.val !== null && wordIndex < word.length) {
    let flag = false;
    for (let nextNode of cur.next) {
      //자식 노드들 중에서
      if (word[wordIndex] === nextNode.val) {
        //알파벳이 일치하면
        wordIndex++; //다음 알파벳 위치
        cur = nextNode; //노드 이동
        flag = true;
        break;
      }
    }
    if (!flag) {
      //자식 노드들 중에서 일치하는걸 찾지 못하면 중단
      break;
    }
  }

  //잇기
  for (let i = wordIndex; i < word.length; i++) {
    let newNode = new Node(word[i], []);
    cur.next.push(newNode);
    cur = newNode;
  }
  cur.next.push(new Node(null, []));
}

function calculateSum() {
  let sum = 0;

  let queue = [];
  for (let nextNode of linkedList.next) {
    queue.push([nextNode, 1]);
  }

  while (queue.length) {
    let newQueue = [];

    for (let [curNode, count] of queue) {
      if (curNode.val === null) {
        sum += count;
      }

      let childCount = curNode.next.length;

      for (let nextNode of curNode.next) {
        if (childCount === 1 || nextNode.val === null) {
          newQueue.push([nextNode, count]);
        } else {
          newQueue.push([nextNode, count + 1]);
        }
      }
    }

    queue = newQueue;
  }

  return sum;
}


~~~
통과1은 간선리스트+배열, 통과2는 링크드리스트+클래스 이용하였음  
풀이는 동일하다  
루트에서부터 시작해서 어디까지 일치하나 확인하고, 나머지 일치하지 않은 부분을 이어준다  
트리가 완성되고나서 그래프의 거리 구하기와 비슷하게 트리에서 자식으로 내려오면서 값을 더해준다  
디버깅 하는데는 통과1이 더 보기 좋으나 이런 트리모양(단방향, 사이클X)일 경우 통과2가 덜 헷갈릴 것 같다  
