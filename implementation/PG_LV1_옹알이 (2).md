https://school.programmers.co.kr/learn/courses/30/lessons/133499

# Pass 1 - JavaScript
~~~javascript
function solution(babbling) {
    let answer = 0;
    let n = babbling.length;
    let list = ["aya", "ye", "woo", "ma"];

    for(let x of babbling){
        let y = x;
        let lastIndex = -1; //중복 검사용
        while(y.length){
            let flag = false; //4개 중 아무것도 가지지 못한 경우 즉시 종료 위한 플래그
            for(let i=0;i<4;i++){
                if(i === lastIndex){
                    continue;
                }
                if(y.indexOf(list[i]) === 0){ //맨 앞에 단어가 4개중 한개라면
                    y = y.substring(list[i].length, y.length); //맨 앞의 단어 제거
                    lastIndex = i;
                    flag = true;
                }
            }
            if(!flag){
                break;
            }
                        
        }
        if(y.length === 0){
            answer++;
        }
    }

    
    
    
    return answer;
}
~~~
