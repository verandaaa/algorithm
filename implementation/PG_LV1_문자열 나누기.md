https://school.programmers.co.kr/learn/courses/30/lessons/140108

# Pass 1 - JavaScript
~~~javascript
function solution(s) {
    let answer = 0;
    
    let i = 0;
    while(i<s.length){
        let x = s[i];
        let count = 1;
        while(i < s.length && count > 0){
            i++;
            
            if(s[i] === x){
                count++;
            }
            else{
                count--;
            }
        }
        i++;
        answer++;
    }
    
    return answer;
}
~~~
