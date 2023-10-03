https://school.programmers.co.kr/learn/courses/30/lessons/140107

# Pass 1 - JavaScript
~~~javascript
function solution(k, d) {
    let answer = 0;
    
    //k=2 d=4
    for(let i=0;i<=d;i+=k){ //x좌표는 0 2 4 가능
        let last = Math.floor(Math.sqrt(d*d-i*i)); //가능한 최대 y좌표
        last -= last%k; //k조건에 맞추기
        answer+=last/k+1; //개수 구하기
    }
    
    return answer;
}
~~~
