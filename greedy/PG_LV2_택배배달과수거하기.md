https://school.programmers.co.kr/learn/courses/30/lessons/150369

# Solution 1 - JavaScript
~~~javascript
function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    
    let deliveriesEnd = findEnd(deliveries);
    let pickupsEnd = findEnd(pickups);
    
    while(deliveriesEnd>=0 || pickupsEnd>=0){
        answer += Math.max(deliveriesEnd,pickupsEnd)+1;
        
        deliveriesEnd = giveAndTake(deliveries, deliveriesEnd, cap);
        pickupsEnd = giveAndTake(pickups, pickupsEnd, cap);
              
    }
    return answer*2;
}

function findEnd(array){
    for(let i=array.length-1;i>=0;i--){
        if(array[i]>0)
            return i;
    }
    return -1;
}

function giveAndTake(infos, end, cap){
    let deliveryCap = cap;
    while(end>=0){
        if(infos[end]<=deliveryCap){
            deliveryCap -= infos[end];
            end--;
        }
        else{
            infos[end] -= deliveryCap;
            break;
        }
    }
    return end;
}
~~~
