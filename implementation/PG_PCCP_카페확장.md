https://school.programmers.co.kr/learn/courses/15009/lessons/121689

# Pass 1 - JavaScript
~~~javascript
function solution(menu, order, k) {
    let answer = 0;
    
    let currentOrder = [];
    for(let i=0;;i++){ //현재 초
        //종료조건
        if(!currentOrder.length && i/k>order.length-1){
            break;
        }
        //먼저 나가고
        if(currentOrder.length && currentOrder[0]===0){
            currentOrder.shift();
        }
        
        //방문자수 체크
        answer=Math.max(answer, currentOrder.length);
        
        //들어올 사람 있으면 들어오고
        if(i%k===0 && i/k<=order.length-1){
            currentOrder.push(menu[order[i/k]]);
        }
        //음료 제작
        if(currentOrder.length){
            currentOrder[0]--;
        }
        
    }
    
    return answer;
}
~~~
