https://school.programmers.co.kr/learn/courses/30/lessons/169199

# Solution 1 - JavaScript
```javascript
function solution(board) {
    let answer = -1;
    let start = {x:-1, y:-1, count:0};

    const map =  board.map((x,index)=>{
        if(x.search('R')>=0){
           start.x=index;
           start.y=x.search('R');
        }
        return x.split('');
    });

    let n = map.length;
    let m = map[0].length;
    let dx = [-1,1,0,0];
    let dy = [0,0,-1,1];
    let queue = [];
    let visited = Array.from(Array(n),()=>Array(m).fill(false));

    queue.push(start);
    visited[start.x][start.y] = true;

    while(queue.length){
        let q = queue.shift();
        let x = q.x;
        let y = q.y;
        let count = q.count;

        if(map[x][y]==='G'){
            answer=count;
            break;
        }

        for(let d=0;d<4;d++){
            for(let e=1;;e++){
                let nx = x+dx[d]*e;
                let ny = y+dy[d]*e;

                //맵을 벗어나거나 D를 만난 경우
                if((nx<0 || nx>=n || ny<0 || ny>=m) || map[nx][ny]==='D'){
                    //그 바로 전 위치를 방문한 적이 없다면
                    let nnx = nx-dx[d];
                    let nny = ny-dy[d];

                    if(!visited[nnx][nny]){
                        visited[nnx][nny] = true;
                        queue.push({x:nnx, y:nny, count:count+1});
                    }
                    break;
                }
            }
        }
    }

    return answer;
}
```
