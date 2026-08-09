https://school.programmers.co.kr/learn/courses/30/lessons/135808

# Pass 1 - JavaScript
~~~javascript
function solution(k, m, score) {
    let answer = 0;
    
    score.sort((a,b) => b-a);
    score = score.slice(0, score.length - score.length % m);
    for(let i=m-1;i<score.length;i+=m){
        answer += score[i] * m;
    }
    
    return answer;
}
~~~
