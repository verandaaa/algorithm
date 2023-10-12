https://school.programmers.co.kr/learn/courses/30/lessons/42584

# Pass 1 - JavaScript
~~~javascript
function solution(prices) {
    // prices = [1,2,3,4,5,4,3,2,1]
    
    let answer = Array.from(Array(prices.length),()=>-1);
    
    let stack = [];
    for(let i=0;i<prices.length;i++){
        let price = prices[i];
        
        while(stack.length>0 && stack[stack.length-1][1] > price){ //하강세 발견시 뿌리를 다 쳐냄
            let top = stack.pop();
            answer[top[0]]=i-top[0]; //하강세 발견 시점부터 뿌리까지의 갯수
        }
        
        stack.push([i,price]);
    }
    
    //상승세만 남음
    let last = stack[stack.length-1]; //맨 마지막을 기준으로
    while(stack.length>0){
        let top = stack.pop();
        answer[top[0]]=last[0]-top[0]; //갯수 구하기
    }
    
    
    return answer;
}
~~~
