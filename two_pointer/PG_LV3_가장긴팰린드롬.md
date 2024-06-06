https://school.programmers.co.kr/learn/courses/30/lessons/12904

# Pass 1 - JavaScript
~~~javascript
function solution(s){
    let answer = 0;

    //abcba
    for(let mid=0;mid<s.length;mid++){
        let count = getCount(s, mid, mid);
        answer = Math.max(answer, count*2-1);
    }
    
    //abccba
    for(let mid=0;mid<s.length;mid++){
        let count = getCount(s, mid, mid+1);
        answer = Math.max(answer, count*2);
    }

    return answer;
}

function getCount(s, left, right){
    let count = 0;
    
    //대칭일때까지 좌우로 뻗어나간다
    while(left>=0 && right<s.length){
        if(s[left--]!==s[right++]){
            break;
        }
        count++;
    }
    
    return count;
}
~~~
