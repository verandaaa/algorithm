https://school.programmers.co.kr/learn/courses/15009/lessons/121687

# Pass 1 - JavaScript
~~~javascript
function solution(command) {
    let answer = [];
    
    let dx = [0,1,0,-1]; //상우하좌
    let dy = [1,0,-1,0];
    
    let x=0;
    let y=0;
    let d=0; //상
    
    for(let c of command){ //GRGRGRB
        if(c==="R"){
            d = (d+1)%4;
        }
        else if(c==="L"){
            d = (d+3)%4;
        }
        else if(c==="G"){
            x+=dx[d];
            y+=dy[d];
        } 
        else if(c==="B"){
            x+=dx[(d+2)%4];
            y+=dy[(d+2)%4];
        }
    }
    answer = [x,y];
    
    return answer;
}
~~~
