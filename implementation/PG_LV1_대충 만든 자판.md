https://school.programmers.co.kr/learn/courses/30/lessons/160586

# Pass 1 - JavaScript
~~~javascript
function solution(keymap, targets) {
    var answer = [];
    
    let map = new Map();
    for(let str of keymap){
        for(let i=0;i<str.length;i++){
            map.set(str[i], Math.min(map.get(str[i]) || Infinity, i+1));
        }
    }
    
    for(let target of targets){
        let count = 0;
        for(let i=0;i<target.length;i++){
            if(map.has(target[i])){
                count += map.get(target[i])
            }
            else{
                count = -1;
                break;
            }
        }
        answer.push(count);
    }
    
    return answer;
}
~~~
