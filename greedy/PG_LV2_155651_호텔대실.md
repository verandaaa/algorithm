https://school.programmers.co.kr/learn/courses/30/lessons/155651

# Solution 1 - JavaScript
```javascript
function solution(book_time) {
    let answer = 0;
    let room = [];
    let newBookTime = book_time.map((item)=>{
        return {
            start:convertTime(item[0],"start"),
            end:convertTime(item[1],"end")
        }
    });
    newBookTime.sort((a,b)=>a.start-b.start);
    
    newBookTime.forEach((time)=>{
        let flag = false;
        for(let i=0;i<room.length;i++){
            if(room[i]<=time.start){
                room[i]=time.end;
                flag=true;
                break;
            }
        }
        if(!flag){
            room.push(time.end);
        }
    });
    
    answer=room.length;
    
    return answer;
}

function convertTime(time, option){
    const hourAndMinute = time.split(":");
    const hour = hourAndMinute[0]*1*60;
    const minute = option === "start" ? hourAndMinute[1]*1 : hourAndMinute[1]*1+10;
    const total  = hour+minute;
    
    return total;
}
```
