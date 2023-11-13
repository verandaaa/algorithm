https://school.programmers.co.kr/learn/courses/30/lessons/132265

# Pass 1 - JavaScript
~~~javascript
function solution(topping) {
    let answer = 0;
    
    let map1 = new Map();
    let map2 = new Map();
    
    for(let x of topping){ //인데스 0을 기점으로 1번과 2번을 나누기
        map2.set(x,map2.get(x)+1||1);
    }
    for(let x of topping){ //1번에 하나 추가, 2번에 하나 삭제 하면서 경계 이동
        map1.set(x,map1.get(x)+1||1);
        if(map2.has(x)){
            map2.set(x,map2.get(x)-1);
            if(map2.get(x)===0){
                map2.delete(x);
            }
        }
        if(map1.size===map2.size){
            answer++;
        }
    }
    
    return answer;
}
~~~
