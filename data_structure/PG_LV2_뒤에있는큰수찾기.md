https://school.programmers.co.kr/learn/courses/30/lessons/154539

# Solution 1 - Javascript
~~~javascript
function solution(numbers) {
    let answer = [];
    let stack = [];
    
    for(let i=numbers.length-1;i>=0;i--){
        while(numbers[i]>=stack[stack.length-1]){
            stack.pop();
        }
        answer[i] = stack[stack.length-1] || -1;
        stack.push(numbers[i]);
    }   
    
    return answer;
}
~~~
