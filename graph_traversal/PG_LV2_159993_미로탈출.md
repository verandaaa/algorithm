https://school.programmers.co.kr/learn/courses/30/lessons/159993

# Solution 1 - Javascript
~~~javascript
function solution(maps) {
    let answer = -1;
    let map = [];
    let start;
    let lever;
    let n = maps.length;
    let m = maps[0].length
    maps.forEach((v,index)=>{
        if(v.search("S")>=0){
            start={x:index, y:v.search("S"), c:0};
        }
        if(v.search("L")>=0){
            lever={x:index, y:v.search("L"), c:0};
        }
        map.push(v.split(""));
    });
    let dx=[-1,1,0,0];
    let dy=[0,0,-1,1];
    let a = [];
    
    bfs(start,'L', 0);
    bfs(lever,'E', 1);
    
    function bfs(s,e,count){
        
        let queue=[];
        queue.push(s);
        let visited=Array.from(Array(n),()=>Array(m).fill(false));
        visited[s.x][s.y]=true;

        while(queue.length){
            let q = queue.shift();
            let x = q.x;
            let y = q.y;
            let c = q.c;
            if(map[x][y]===e){
                a[count]=c;
                break;
            }

            for(let d=0;d<4;d++){
                let nx = x+dx[d];
                let ny = y+dy[d];

                if(nx<0 || nx>=n || ny<0 || ny>=m)
                    continue;
                if(visited[nx][ny])
                    continue;
                if(map[nx][ny]==='X')
                    continue;

                queue.push({x:nx,y:ny,c:c+1});
                visited[nx][ny]=true;
            }
        }
    }
    if(a[0] && a[1])
        answer=a[0]+a[1];
    
    return answer;
}
~~~
