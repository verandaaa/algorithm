https://school.programmers.co.kr/learn/courses/30/lessons/468371?language=javascript

# Pass 1 - JavaScript
~~~javascript
function solution(signals) {
    let answer = -1;
    
    let colors = ['G', 'Y', 'R']
    let map = []
    for(let signal of signals){
        let array = [];
        for(let i=0;i<3;i++){
            for(let j=0;j<signal[i];j++){
                array.push(colors[i])
            }
        }
        map.push(array)
    }
    
    let current = 0;
    while(current < 20**5){
        let count = 0;
        for(let i=0;i<signals.length;i++){
            if(map[i][current%(map[i].length)] === 'Y'){
                count++;
            }
        }
        if(count === signals.length){
            answer = current+1;
            break;
        }
        current++;
    }
    
    return answer;
}
~~~
