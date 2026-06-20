https://school.programmers.co.kr/learn/courses/30/lessons/142086

# Pass 1 - JavaScript
~~~javascript
function solution(s) {
    let answer = [];
    
    let map = new Map();
    for(let i=0;i<s.length;i++){
        if(map.has(s[i])){
            answer.push(i-map.get(s[i]));
        }
        else{
            answer.push(-1);
        }
        map.set(s[i], i)
    }
    
    return answer;
}
~~~
