# Pass 1 - JavaScript
~~~javascript
function solution(n, m, hole) {
  let answer = 0;

  class Pos {
    constructor(x, y, c, s) {
      this.x = x;
      this.y = y;
      this.c = c;
      this.s = s;
    }
  }

  let map = Array.from(Array(m), () => Array(n).fill(0));
  for (let h of hole) {
    map[m - h[1]][h[0] - 1] = -1;
  }

  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
  let ddx = [-2, 2, 0, 0];
  let ddy = [0, 0, -2, 2];

  let queue = [new Pos(m - 1, 0, 0, 0)];
  let visit = Array.from(Array(2), () =>
    Array.from(Array(m), () => Array(n).fill(false))
  );
  visit[0][m - 1][0] = true;
  while (queue.length) {
    let q = queue.shift();
    //console.log(q.x, q.y, q.c, q.s);

    if (q.x === 0 && q.y === n - 1) {
      answer = q.c;
      break;
    }

    //신발 없이 이동
    for (let d = 0; d < 4; d++) {
      let nx = q.x + dx[d];
      let ny = q.y + dy[d];

      if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
        continue;
      }
      if (map[nx][ny] === -1) {
        continue;
      }
      if (visit[q.s][nx][ny]) {
        continue;
      }
      visit[q.s][nx][ny] = true;
      let nc = q.c + 1;
      let ns = q.s;
      queue.push(new Pos(nx, ny, nc, ns));
    }
    //신발로 이동
    if (q.s === 1) {
      continue;
    }
    for (let d = 0; d < 4; d++) {
      let nx = q.x + ddx[d];
      let ny = q.y + ddy[d];

      if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
        continue;
      }
      if (map[nx][ny] === -1) {
        continue;
      }
      if (visit[q.s + 1][nx][ny]) {
        continue;
      }
      visit[q.s + 1][nx][ny] = true;
      let nc = q.c + 1;
      let ns = q.s + 1;
      queue.push(new Pos(nx, ny, nc, ns));
    }
  }
  if (answer === 0) {
    answer = -1;
  }

  return answer;
}
~~~

백준[말이 되고픈 원숭이]와 유사한 문제  
visit에서 q.s로 했어야했는데 0, 1로 두었음  
q.s로 두어야 신발기회를 쓴 상태에서 일반이동을 한다면 1이된다  
