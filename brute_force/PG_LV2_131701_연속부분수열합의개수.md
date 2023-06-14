https://school.programmers.co.kr/learn/courses/30/lessons/131701

# Solution 1 - JavaScript
~~~javascript
function solution(elements) {
    let answer = 0;
    let set = new Set();
    
    for(let i=0;i<elements.length;i++){
        let sum=0;
        let j=i;
        while(true){
            sum+=elements[j++];
            set.add(sum);
            if(j===elements.length){ //인덱스 넘어가면 0으로 초기화
                j=0;
            }
            if(j===i){ //길이만큼 돌았으면 중지
                break;
            }
        }
    }
    answer = set.size;
    
    return answer;
    
}
~~~
