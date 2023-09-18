https://school.programmers.co.kr/learn/courses/30/lessons/92341

# Pass 1 - JavaScript
~~~javascript
function solution(fees, records) {
    let answer = [];
    
    let times = Array.from(Array(10000),()=>0);
    for(let record of records){
        let [time, number, order] = record.split(" ");
        time = time.split(":").map(Number);
        number*=1;
        if(order=="IN"){ //입차시
            times[number] += ((23*60+59) - (time[0]*60+time[1]));
        }
        else{ //출차시
            times[number] += ((time[0]*60+time[1]) - (23*60+59));
        }
    }
    for(let time of times){
        if(time<=0){
            continue;
        }
        let cost = time > fees[0] ? fees[1]+Math.ceil((time-fees[0])/fees[2])*fees[3] : fees[1];
        answer.push(cost);
    }
    
    
    return answer;
}
~~~
