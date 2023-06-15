https://school.programmers.co.kr/learn/courses/30/lessons/154540

# Solution 1 - JavaScript
~~~javascript
function solution(maps) {
    let answer = [];
    let map = maps.map((map)=>{
       return map.split("");
    });
    let n = map.length;
    let m = map[0].length;
    let visited = Array.from(Array(n),()=>Array(m).fill(false));
    let dx = [-1,1,0,0];
    let dy = [0,0,-1,1];
    
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(map[i][j]!=='X' && !visited[i][j]){ //방문한적이 없는 섬만 탐색 시작
                bfs(i,j);
            }
        }
    }
    
    function bfs(i,j){
        let queue = [[i,j]]; //시작점을 기준으로
        visited[i][j] = true;
        let sum = 0;
        while(queue.length>0){
            let q = queue.shift();
            let x = q[0];
            let y = q[1];
            sum+=map[x][y]*1;
            
            for(let d=0;d<4;d++){ //섬의 지역 중 방문하지 않은 곳만 탐색
                let nx = x+dx[d];
                let ny = y+dy[d];
                
                if(nx<0 || nx>=n || ny<0 || ny>=m)
                    continue;
                if(map[nx][ny]==='X')
                    continue;
                if(visited[nx][ny])
                    continue;
                
                queue.push([nx,ny]);
                visited[nx][ny]=true;
            }
        }
        answer.push(sum);
    }
    answer.sort((a,b)=>a-b);
    
    if(answer.length===0)
        answer = [-1];
    
    return  answer;
}
~~~
