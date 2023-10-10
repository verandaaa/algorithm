https://school.programmers.co.kr/learn/courses/30/lessons/154538

# Solution 1 - Javascript
```javascript
function solution(x, y, n) {
    let answer = 0;
    let memo = Array.from({length:1000001},()=>-1);
    let queue=[];

    memo[x]=0;
    queue.push(x);

    while(queue.length){
        let s = queue.shift();

        let a = s+n;
        if(a<=y && (memo[a]===-1 || memo[s]+1<memo[a])){
            memo[a] = memo[s]+1;
            queue.push(a);
            if(a===y)
                break;
        }

        let b = s*2;
        if(b<=y && (memo[b]===-1 || memo[s]+1<memo[b])){
            memo[b] = memo[s]+1;
            queue.push(b);
            if(b===y)
                break;
        }

        let c = s*3;
        if(c<=y && (memo[c]===-1 || memo[s]+1<memo[c])){
            memo[c] = memo[s]+1;
            queue.push(c);
            if(c===y)
                break;
        }
    }

    answer = memo[y];
    return answer;
}
```
a,b,c 의 코드 내용이 중복된다.  
또한 memo[s]+1<memo[a] 이 부분도 필요가 없다. bfs로 뻗어 나가기 때문에 이미 방문한 적이 있는 숫자를 또 방문할 필요가 없다.  

# Solution 2 - Javascript
```javascript
function solution(x, y, n) {
    let answer = 0;
    let memo = Array.from({length:1000001},()=>-1);
    let queue=[x];
    
    memo[x]=0;
    
    while(queue.length){
        let s = queue.shift();
        
        for(let e of [s+n, s*2, s*3]){
            if(e===y)
                return memo[s]+1;
            
            if(e<y && memo[e]===-1){
                memo[e] = memo[s]+1;
                queue.push(e);           
            }
        }
    }
    
    answer = memo[y];
    return answer;
}
```
for(let e of [s+n, s*2, s*3])을 통해 반복적인 코드의 내용을 줄였다.  

# Solution 3 - Javascript
```javascript
function solution(x, y, n) {
    let answer = 0;
    let memo = Array.from({length:1000001},()=>-1);
    let queue=[x];
    
    memo[x]=0;
    
    while(queue.length){
        let newQueue = [];
        
        for(let q of queue){
            for(let e of [q+n, q*2, q*3]){
                if(e===y)
                    return memo[q]+1;
            
                if(e<y && memo[e]===-1){
                    memo[e] = memo[q]+1;
                    newQueue.push(e);           
                }
            }
        }
        queue = newQueue;
    }
    
    answer = memo[y];
    return answer;
}
```
shift가 시간을 많이 잡아먹는 것을개선한코드이다.

# Solution 4 - Javascript
```javascript
function solution(x, y, n) {
    let answer = 0;
    let memo = [];
    let queue=[x];
    
    memo[x]=0;
    
    if(x===y)
        return 0;
    
    while(queue.length){
        let newQueue = [];
        
        for(let q of queue){
            for(let e of [q+n, q*2, q*3]){
                if(e===y)
                    return memo[q]+1;
            
                if(e<y && !memo[e]){
                    memo[e] = memo[q]+1;
                    newQueue.push(e);           
                }
            }
        }
        queue = newQueue;
    }
    
    return -1;
}
```
memo할 공간을 꼭 최대크기로 지정해두지 않아도 된다.  
