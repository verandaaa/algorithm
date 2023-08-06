https://school.programmers.co.kr/learn/courses/30/lessons/138476

# Solution 1 - JavaScript
~~~javascript
function solution(k, tangerine) {
    let answer = 0;
    let map = new Map(); //귤의 종류 및 개수
    
    for(let i=0;i<tangerine.length;i++){
        map.set(tangerine[i], map.get(tangerine[i])+1 || 1);
    }
    let arr = Array.from(map, ([key, value]) => ({ key, value }));
    arr.sort((a,b)=>b.value - a.value); //가지고 있는 개수가 많은 순으로 정렬
    
    console.log(arr);
    
    let count = 0;
    for(let i=0;i<arr.length;i++){
        count += arr[i].value;
        if(count>=k){
            answer = i+1;
            break;
        }
    }
    
    return answer;
}
~~~

- map 을 array로 변환하는 두가지 방법  
let arr = Array.from(map);  
let arr = Array.from(map, ([key, value]) => ({ key, value }));  
