https://school.programmers.co.kr/learn/courses/30/lessons/150365

# Solution 1 - JavsSript
~~~javascript
function solution(n, m, x, y, r, c, k) {
  //n*m 격자, (x,y)출발 (r,c)도착, 거리는 k
  x--;
  y--;
  r--;
  c--;
  let dx = [1, 0, 0, -1]; //하 좌 우 상(d l r u)
  let dy = [0, -1, 1, 0];
  let dir = ["d", "l", "r", "u"];
  let answer = "";

  if (getDistance(x, y, r, c) > k || (k - getDistance(x, y, r, c)) % 2 === 1) {
    //출발->도착 최소거리가 k보다 크거나 , 그 차이가 2로 나누어떨어지지 않아 영원히 도달 불가능
    return "impossible";
  }

  //이제부턴 무조건 k번에 도달 가능임
  for (let i = 0; i < k; i++) {
    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      //놀 수 있을 만큼만 놀아라.
      //ddlrlrlrlrlrlrlrlrlrlrr의 경우 lr을 반복하며 놀다가 이제 거리 여유분이 없을 경우 r로 골인한다
      if (k - i < getDistance(nx, ny, r, c)) continue;

      answer += dir[d];
      x = nx;
      y = ny;
      break;
    }
  }

  return answer;
}

function getDistance(nx, ny, r, c) {
  //맨하튼거리
  return Math.abs(r - nx) + Math.abs(c - ny);
}
~~~

# 시행착오
~~~javascript
function solution(n, m, x, y, r, c, k) {
  //n x m 격자, (x,y)출발 (r,c)도착, 거리는 k
  class Pos {
    constructor(x, y, c) {
      this.x = x;
      this.y = y;
      this.c = c;
    }
  }
  x--;
  y--;
  r--;
  c--;
  let dx = [1, 0, 0, -1]; //하 좌 우 상(d l r u)
  let dy = [0, -1, 1, 0];
  let dir = ["d", "l", "r", "u"];

  let result = [];
  let answer = "impossible";
  let flag = false;

  if ((k - (Math.abs(x - r) + Math.abs(y - c))) % 2 === 1) { //도달 불가
    return answer;
  }
  
  //도달 가능
  dfs(new Pos(x, y, 0));
  
  function dfs(p) {
    if (flag) return;
    if (p.x === r && p.y === c && p.c === k) { //정답
      answer = result.join("");
      flag = true;
      return;
    }
    if (p.c > k) { //거리값이 넘은 경우 뒤로가기
      return;
    }

    for (let d = 0; d < 4; d++) { //4방탐색
      let nx = p.x + dx[d];
      let ny = p.y + dy[d];
      let nc = p.c + 1;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      result.push(dir[d]);
      dfs(new Pos(nx, ny, nc));
      result.pop();
    }
  }

  return answer;
}
~~~
처음에 bfs로 풀다가... dfs로 바꿨다가...  
테스트결과 답은 잘 나오는 것 같으나 k가 최대 2500이라서 시간초과 발생...
