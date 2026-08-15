https://school.programmers.co.kr/learn/courses/30/lessons/131705

# Pass 1 - JavaScript
~~~javascript
function solution(number) {
    let answer = 0;
    
    let n = number.length;
    
    dfs(0, 0, 0);
    
    function dfs(end, start, sum){
        if(end === 3){
            if(sum === 0){
                answer++;
            }
            return;
        }
        for(let i = start; i < n; i++){
            dfs(end + 1, i + 1, sum + number[i]);
        }
    }
    
    return answer;
}
~~~
