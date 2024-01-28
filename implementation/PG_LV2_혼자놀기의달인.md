https://school.programmers.co.kr/learn/courses/30/lessons/131130

# Pass 1 - JavaScript
~~~javascript
function solution(cards) {
    let answer = 0;
    
    let n = cards.length;
    
    for(let i=0;i<n;i++){
        for(let j=i+1;j<n;j++){
            //상자 세팅
            let isOpen = new Array(n+1).fill(false);
            let cur;
            
            //1번 상자
            let count1 = 0;
            cur = i;
            while(!isOpen[cur]){
                isOpen[cur] = true;
                cur = cards[cur]-1;
                count1++;
            }
            //2번 상자
            let count2 = 0;
            cur = j;
            while(!isOpen[cur]){
                isOpen[cur] = true;
                cur = cards[cur]-1;
                count2++;
            }
            
            answer = Math.max(answer, count1*count2);
        }
    }
    
    return answer;
}
~~~
