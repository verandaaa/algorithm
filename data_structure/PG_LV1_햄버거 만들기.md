# Pass 1 - JavaScript
~~~javascript
function solution(ingredient) {
    let answer = 0;
    
    let order = [1, 3, 2, 1];
    let n = order.length
    
    let stack = [];
    let index = 0;
    
    while(index<ingredient.length){
        stack.push(ingredient[index++]);
        // console.log('push', stack)
    
        let count = 0;
        for(let i = 0; i < (stack.length >= n ? n : 0); i++){
            if(stack[stack.length-(i+1)] === order[i]){
                count++;
            }
            else{
                break;
            }
        }
        if(count === n){
            for(let i = 0; i < n; i++){
                stack.pop();
                // console.log('pop', stack)
            }
            answer++;
        }
    }

    return answer;
}
~~~

생각보다 쉽지 않았음  
stack 을 꼭 1개씩 pop 하지 않고 생각하지 말고, 여러개씩 묶어서 단위로 pop 하는 문제였음
