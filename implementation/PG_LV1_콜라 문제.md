https://school.programmers.co.kr/learn/courses/30/lessons/132267

# Pass 1 - JavaScript
~~~javascript
function solution(a, b, n) {
    let answer = 0;
    
    while(n >= a){
        let c = Math.floor(n / a);
        n = n - c * a + c * b;
        answer += c * b;
    }
    
    return answer;
}
~~~
