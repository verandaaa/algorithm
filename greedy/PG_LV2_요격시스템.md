https://school.programmers.co.kr/learn/courses/30/lessons/181188

# Solution 1 - JavaScript

~~~javascript
function solution(targets) {
    let answer = 0;
    let cur = [100000001,-1];
    
    targets.sort((a,b)=>{
       if(a[0]!=b[0])
           return a[0]-b[0];
        return a[1]-b[1];
    });
      
    targets.forEach((target)=>{
        cur = [Math.max(target[0],cur[0]), Math.min(target[1],cur[1])];
        if(cur[0]>=cur[1]){
            answer++;
            cur=[target[0], target[1]];
        }
    });
    
    return answer;
}
~~~
