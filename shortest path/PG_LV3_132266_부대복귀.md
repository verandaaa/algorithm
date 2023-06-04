https://school.programmers.co.kr/learn/courses/30/lessons/132266

# Solution 1 - JavaScript
~~~javascript
function solution(n, roads, sources, destination) {
    let answer = [];
    let map = Array.from(Array(n+1),()=>[]);
    let visited = new Array(n+1).fill(Infinity); //처음에는 무한으로 둔다
    
    for(let [s,e] of roads){
        map[s].push(e);
        map[e].push(s);
    }
    
    //1과 5의 거리, 2와 5의 거리, 3과 5의 거리, 4와 5의 거리, 5와 5의 거리를 구해야 한다
    //즉, 5를 기준으로 나머지에 대해서 거리를 구하는 것이다.
    let queue = [destination]; 
    visited[destination] = 0;
    while(queue.length > 0){
        const s = queue.shift(); 
        for(let e of map[s]){ //s에서 직접 갈 수 있는 도착지 e를 고른다
            if(visited[s]+1 < visited[e]){ //만약 s를 거쳐서 e를 가는것이 더 유리할 경우
                visited[e] = visited[s]+1; //갱신
                queue.push(e);
            }
        }
    }
    answer =  sources.map(v=>{
        if(visited[v] === Infinity)
            return -1;
        else 
            return visited[v];
    });
    
    return answer;
}
~~~

- 다익스트라  
한 노드에서 다른 모든 노드까지의 최단거기를 구하는 알고리즘  

- 벨만포드  
가중 유향 그래프 상에서 특정 한 노드로 부터 다른 노드까지의 최단 경로를 구하는 알고리즘.  
다익스트라 알고리즘을 한계점을 보완함.  
음의 가중치 자체가 문제가 되는 것이 아니라, 사이클을 형성할때 음의 가중치를 가지면 문제가 된다.  
가중치가 모두 양수일 경우 다익스트라를 사용하는 것이 좋다.  

- 플로이드워셜  
모든 노드 간의 최단거리를 구할 수 있다.  
한 노드에서 다른 모든 노드까지의 최단 거리를 구하는 다익스트라와 벨만포드 알고리즘과 대조된다.  
플로이드 워셜 알고리즘은 그래프 상에서 음의 가중치가 있더라도 최단 경로를 구할 수 있다.  
하지만 음의 가중치와 별개로 음의 사이클이 존재한다면 벨만 포드 알고리즘을 사용해야 한다.  

참고) https://roytravel.tistory.com/340
