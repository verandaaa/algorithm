https://school.programmers.co.kr/learn/courses/30/lessons/148653

# Solution 1 - JavaScript
~~~javascript
function solution(storey) {
    let answer = 0;
    
    while(storey>0){
        let end = storey%10;
        if(end<5){ //0~4의 경우 빼주는게 더 이득이다
            answer+=end;
            storey-=end;
        }
        else if(end===5){ //5의 경우 그 전 자리까지 확인해야 한다 
            let before = Math.floor(storey/10)%10;
            if(before>=5){ // 255 265... 와 같은 경우는 올려주어서 260 270... 으로 만들고
                storey+=end;
            }
            else{ //245 235... 와 같은 경우는 내려주어서 240 230... 으로 만든다
                storey-=end;
            }
            answer+=end;
        }
        else{ //6~9의 경우 올려주는게 더 이득이다
            answer+=(10-end);
            storey+=(10-end);
        }
        storey/=10;
    }
    
    return answer;
}
~~~
