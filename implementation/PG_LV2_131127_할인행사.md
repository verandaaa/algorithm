https://school.programmers.co.kr/learn/courses/30/lessons/131127

# Solution 1 - JavaScript
~~~javascript
function solution(want, number, discount) {
    let answer = 0;
    let map = new Map();
    
    for(let i=0;i<want.length;i++){ //각 품목에 대한 인덱스를 찾기 위함
        map.set(want[i],i);
    }
    
    for(let i=0;i<9;i++){ //9개만큼 더하고 
        let index = map.get(discount[i]);
        if(index>=0){
            number[index]--;
        }
    }
    
    for(let i=9;i<discount.length;i++){
        let index = map.get(discount[i]);
        if(index>=0){ //10개째 확인
            number[index]--;
        }
        if(Math.max(...number)<=0){ //모두 다 샀으므로 0 이상
            answer++;
        }
        index = map.get(discount[i-9]);
        if(index>=0){ //맨앞꺼 빼주고 반복..
            number[index]++;
        }
    }
    
    return answer;
}
~~~
