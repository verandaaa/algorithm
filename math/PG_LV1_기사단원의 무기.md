https://school.programmers.co.kr/learn/courses/30/lessons/136798

# Pass 1 - JavaScript
~~~javascript
function solution(number, limit, power) {
    let answer = 0;
    
    let list = new Array(number+1).fill(0);
    
    for(let i=1;i<=number;i++){
        for(let j=i;j<=number;j+=i){
            list[j]++;
        }
    }
    
    for(let i=1;i<=number;i++){
        if(list[i] > limit){
            answer += power;
        }
        else{
            answer += list[i];
        }
    }
    
    return answer;
}
~~~
