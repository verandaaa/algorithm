https://school.programmers.co.kr/learn/courses/30/lessons/152996

# Pass 1 - JavaScript
~~~javascript
function solution(weights) {
    let answer = 0;
    
    let arr = Array.from(Array(1001),()=>0);
    let parent = [1,2,2,3,3,4,4];
    let child = [1,3,4,2,4,2,3];
    for(let x of weights){
        arr[x]+=1;
    }

    for(let x of weights){
        arr[x]-=1; //내 이전으로는 이미 함
        
        for(let i=0;i<7;i++){ //존재 한다면
            if(arr[x*parent[i]/child[i]]>0){
                answer+=arr[x*parent[i]/child[i]];
            }
        }
    }
    
    
    return answer;
}
~~~
