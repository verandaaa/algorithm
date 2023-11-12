https://school.programmers.co.kr/learn/courses/30/lessons/17679

# Pass 1 - JavaScript
~~~javascript
function solution(m, n, board) { //높이, 너비, 보드
    let answer = 0;
    
    //시계방향으로 회전
    let map = Array.from(Array(n),()=>Array(m));
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            map[i][j] = board[m-1-j][i];
        }
    }
    let copy;
    let dx = [0,0,1,1];
    let dy = [0,1,0,1];
    
    
    while(true){
        //터트리기
        let isEnd = true;
        copy = map.map((line)=>line.slice());
        for(let i=0;i<n-1;i++){
            for(let j=0;j<m-1;j++){
                let cur = map[i][j];
                if(cur==='0'){ //빈자리면 pass
                    continue;
                }
                let flag = true;
                for(let d=1;d<4;d++){ //내 기준 오른쪽, 아래, 오른쪽 아래 검사해서
                    if(cur!==map[i+dx[d]][j+dy[d]]){
                        flag = false;
                    }
                }
                if(!flag){ //하나라도 다르면 pass
                    continue;
                }
                isEnd = false;
                for(let d=0;d<4;d++){ //터질 위치 메모
                    copy[i+dx[d]][j+dy[d]] = "0";
                }
            }
        }
        map = copy.map((line)=>line.slice());
        //터트린게 없다면 중단
        if(isEnd){
            break;
        }
        //왼쪽으로 이동시키기
        map = map.map((line)=>line.join("").split("0").join("").concat("0".repeat(m)).split("").slice(0,m));
        
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(map[i][j]==='0'){
                answer++;
            }
        }
    }
    
    return answer;
}
~~~
