https://school.programmers.co.kr/learn/courses/30/lessons/87390

# Solution 1 - JavaScript
~~~javascript
function solution(n, left, right) {
    let answer = [];
    
    for(let x=left;x<=right;x++){ //번호로부터
        let i = Math.floor(x/n); //(i,j)를 찾아
        let j = x%n;
        
        answer.push(Math.max(i,j)+1); //규칙성에 맞는 값을 찾는다
    }
    
    return answer;
}
~~~

n이 최대 10^7이므로, 직접 이차원 배열을 구현하고 자르고 할 수 없다  
문제 읽기 전에 범위를 항상 확인하자  
