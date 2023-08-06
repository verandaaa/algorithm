https://school.programmers.co.kr/learn/courses/30/lessons/72413

# Solution 1 - JavaScript
~~~javascript
function solution(n, s, a, b, fares) {
    let answer = 0;
    
    let distance = Array.from(Array(n+1),()=>Array(n+1).fill(Infinity));
    for(let i=1;i<n+1;i++){
        for(let j=1;j<n+1;j++){
            if(i===j){
                distance[i][j] = 0;
            }
        }
    }
    for(let fare of fares){
        distance[fare[0]][fare[1]] = fare[2];
        distance[fare[1]][fare[0]] = fare[2];
    }
    
    for(let k=1;k<n+1;k++){
        for(let i=1;i<n+1;i++){
            for(let j=1;j<n+1;j++){
                distance[i][j] = Math.min(distance[i][j], distance[i][k]+distance[k][j]);
            }
        }
    }
    
    //따로 가는 경우 s->a, s->b
    answer = distance[s][a] + distance[s][b];
    
    //여기까지 같이 가는 경우 s->1, 1->a, 1->b
    for(let k=1;k<n+1;k++){
        answer = Math.min(answer, distance[s][k] + distance[k][a] + distance[k][b]);
    }
    
    return answer;
}
~~~

플로이드워셜 알고리즘을 알면 쉽게 해결되는 문제  
