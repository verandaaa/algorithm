https://school.programmers.co.kr/learn/courses/30/lessons/178870

# Solution 1 - JavaScript
~~~javascript
function solution(sequence, k) {
    let answer = [0,1000000];
    let length = sequence.length-1;
    let sum=0;
    let s=0, e=-1;
    
    while(e<sequence.length){ //end의 마지막 인덱스
        if(sum<k){ 
            sum+=sequence[++e]; //다음 값을 더한다
        }
        else if(sum>k){ 
            while(sum>k){ //초과되지 않을때까지 start의 값을 뺀다
                sum-=sequence[s];
                s++;
            }
        }
        if(sum===k){
            if(e-s < answer[1]-answer[0]){ //더 길이가 작은 수열 등장시 교체
                answer = [s,e];            
            }
            sum-=sequence[s]; //다음으로 이어서 가도록 start 값 빼줌
            s++;
        }
    }
    
    return answer;
}
~~~
