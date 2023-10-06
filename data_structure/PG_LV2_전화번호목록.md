https://school.programmers.co.kr/learn/courses/30/lessons/42577

# Pass 1 - JavaScript
~~~javascript
function solution(phone_book) {
    let answer = true;
    let set = new Set();
    for(let phone of phone_book){
        set.add(phone);
    }
    loop:for(let phone of phone_book){
        for(let i=1;i<phone.length;i++){
            let string = phone.substring(0,i);
            if(set.has(string)){
                answer = false;
                break loop;
            }
        }
    }
    
    return answer;
}
~~~
