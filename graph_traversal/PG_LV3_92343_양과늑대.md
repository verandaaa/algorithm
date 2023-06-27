https://school.programmers.co.kr/learn/courses/30/lessons/92343

# Solution 1 - JavaScript
~~~javascript
function solution(info, edges) {
  class Node {
    constructor(index, sheep, wolf, path) {
      this.index = index;
      this.sheep = sheep;
      this.wolf = wolf;
      this.path = path;
    }
  }
  let answer = 0;
  let adj = Array.from(Array(info.length), () => []);
  for (let edge of edges) {
    adj[edge[0]].push(edge[1]);
  }
  // console.log(adj);

  let queue = [new Node(0, 1, 0, adj[0])]; //루트 노드

  while (queue.length) {
    let node = queue.shift();
    for (let i = 0; i < node.path.length; i++) { 
      let nindex = node.path[i]; //다음 노드
      let nsheep = node.sheep + (info[nindex] === 0 ? 1 : 0); //양인가
      let nwolf = node.wolf + (info[nindex] === 1 ? 1 : 0); //늑대인가
      let npath = [ //다음 노드의 다음 경로
        ...node.path.slice(0, i),
        ...node.path.slice(i + 1, node.path.length),
        ...adj[nindex],
      ];

      if (nsheep <= nwolf) continue; //양이 늑대보다 많아야함

      let nnode = new Node(nindex, nsheep, nwolf, npath);
      queue.push(nnode);

      // console.log(nnode);
    }
      answer = Math.max(answer, node.sheep); //한 노드에 대한 분석을 마친 후 최대값 계산
  }

  return answer;
}
~~~

예제 1번을 기준으로 하면  
시작인 0에서 뻗어나갈 수 있는 길은 1, 8이다  
1은 0에서 뻗어나와 2,4,8을 갈 수 있다  
8은 0에서 뻗어나왔으나 늑대이므로 수가 맞지 않아 갈 수 없어 소멸된다  
2는 1에서 뻗어나와 4, 8을 갈 수 있다  
4는 1에서 뻗어나와 2, 8, 3, 6을 갈 수 있다  
8은 1에서 뻗어나와 2, 4, 7, 9를 갈 수 있다  
무조건 이어진 길만 이어서 가지 않고, 갈 수 있는 길을 적립해둔다는 느낌으로 풀이를 하면 된다  

