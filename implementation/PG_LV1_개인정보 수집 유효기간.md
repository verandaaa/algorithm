https://school.programmers.co.kr/learn/courses/30/lessons/150370

# Pass 1 - JavaScript
~~~javascript
function solution(today, terms, privacies) {
    function getNumber(date){
        let [year, month, day] = date.split(".").map((item) => Number(item));
        let number = year * 12 * 28 + month * 28 + day;
        return number;
    }
    
    var answer = [];
    
    let map = new Map();
    for(let term of terms){
        let [code, month] = term.split(" ");
        map.set(code, month);
    }
    
    let info = []
    for(let privacy of privacies){
        let [date, code] = privacy.split(" ");
        let number = getNumber(date) + map.get(code) * 28;
        info.push(number)
    }
    
    let base = getNumber(today)
    for(let i=0;i<info.length;i++){
        if(base >= info[i]){
            answer.push(i+1)
        }
    }
    
    return answer;
}
~~~
