https://school.programmers.co.kr/learn/courses/30/lessons/152995

# Solution 1 - JavaScript
~~~javascript
function solution(scores) {
    let answer = 1;
    const wanho = scores[0];
    
    scores.sort((a,b)=>{
        if(a[0]===b[0]){
           return (a[1]-b[1]);
        }
        return -(a[0]-b[0]);
    });
    
    console.log(scores);

    let max = -1;
    for(let i=0;i<scores.length;i++){
        if(scores[i][1]>=max){ //인센티브를 받을 수 있다
            max=scores[i][1];
            if(wanho[0]+wanho[1]<scores[i][0]+scores[i][1]){ //완호보다 점수가 클 경우 등수 증가
                answer++;
            }
        }
        else if(wanho[0]===scores[i][0] && wanho[1]===scores[i][1]){ //인센티브를 받을 수 없는데, 그게 완호라면
            return -1;
        }
    }
    
    return answer;
}
~~~

핵심은 A점수가 아래일 경우, B점수는 반드시 같거나 커야 한다.  
  
A점수를 기준으로 내림차순정렬, B점수를 기준으로 오름차순정렬을 하면  
3 1  
2 3  
2 3  
1 0 <-- 먹히지 않으려면 3이상 필요  
1 0 <-- 먹히지 않으려면 3이상 필요  
1 4  
1 5  
  
B점수를 기준으로 할때 주의해야 할 점이, 만약 내림차순정렬은 한다면  
3 1  
2 3  
2 3  
1 5 <-- 3이상이므로 먹히지 않음, max=5  
1 4 <-- 3보다 큰데도 불구하고 먹혀버림   
1 0  
1 0  

따라서 A는 내림차순, B는 오름차순 정렬을 해야함.
