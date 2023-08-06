https://school.programmers.co.kr/learn/courses/30/lessons/118667

# Solution 1 - JavaScript
~~~javascript
function solution(queue1, queue2) { // 3 2 7 2     4 6 5 1
    let answer = 0;
    
    let sum1 = queue1.reduce((prev, val)=>prev+val); // 3 2 7 2 => 14
    let sum2 = queue2.reduce((prev, val)=>prev+val); // 4 6 5 1 => 16
    let goal = (sum1+sum2)/2; // 14 + 16 / 2 = 15
    if((sum1+sum2)%2===1)
        return -1;
    
    let queue = queue1.concat(queue2); // 3 2 7 2 4 6 5 1
    let s=0, e=queue1.length-1;
    let sum = sum1; // 3 2 7 2 => 14
    
    while(sum!==goal){
        if(sum<goal){
            if(e===queue.length-1){
                break;
            }
            e++;
            sum+=queue[e];
            answer++;
        }
        else if(sum>goal){
            if(s===queue.length-1){
                break;
            }
            sum-=queue[s];
            s++;
            answer++;
        }
    }
    if(sum!==goal)
        return -1;
    
    return answer;
}
~~~

예제 1의 경우로 들면 3 2 7 2 4 6 5 1 인데  
3) (2 7 2 4) (6 5 1  
3 2 7 2) (4 6 5) (1  
두 가지 모두 합이 15가 된다.  
공통점은 서로 연결 되어있다는 점   
상대방의 맨 앞을 내 맨 뒤로 보낸다는 점  
-> 투 포인터!  
  
첫 상태 (3 2 7 2) (4 6 5 1) 에서  
4추가, 3제거를 하면 3) (2 7 2 4) (6 5 1 가 된다. (2번)  
이어서 2제거 6추가 7제거 5추가 2제거를 하면 3 2 7 2) (4 6 5) (1 가 된다. (7번)  

queue1과 queue2의 순서는 상관이 없다.  
어차피 (2 7 2 4) (6 5 1 3) 이나 (6 5 1 3) (2 7 2 4)이나 같기 때문이다.  
따라서 첫 상태를 기준으로 가장 빨리 15를 만드는 지점이 답이 된다.  
  
  
  
# 시간초과
~~~javascript
function solution(queue1, queue2) {
    let answer = 0;
    
    let max = Math.pow(2,queue1.length)/2 ;
    let sum1 = queue1.reduce((prev, val)=>prev+val);
    let sum2 = queue2.reduce((prev, val)=>prev+val);
    
    if((sum1+sum2)%2==1)
        return -1;
    
    while(true){
        
        if(sum1>sum2){
            let x = queue1.shift();
            sum1-=x;
            sum2+=x;
            queue2.push(x);
        }
        else if(sum1<sum2){
            let x = queue2.shift();
            sum1+=x;
            sum2-=x;
            queue1.push(x);
        }
        else if(sum1==sum2){
            break;
        }
        if(answer==max){
            answer=-1;
            break;
        }
        
        answer++;

    }
    
    return answer;
}
~~~
직접 qeueue를 변경하며 찾는 방법  
