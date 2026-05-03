https://school.programmers.co.kr/learn/courses/30/lessons/155652

# Pass 1 - JavaScript
~~~javascript
function solution(s, skip, index) {
    let answer = '';
    
    let skipCodeSet = new Set(skip.split("").map((v) => v.charCodeAt(0)))
    
    for(let i=0;i<s.length;i++){
        let code;
        let count = 0;
        let j = 1;
        while(count<index){
            let currentCode = ((s.charCodeAt(i) + j) % 97) % 26 + 97;
            if(!skipCodeSet.has(currentCode)){
                count++;
                code = currentCode
            }
            j++;
        }
        answer += String.fromCharCode(code);
    }
    
    
    
    return answer;
}
~~~
