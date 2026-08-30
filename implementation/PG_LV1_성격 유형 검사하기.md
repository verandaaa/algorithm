https://school.programmers.co.kr/learn/courses/30/lessons/118666

# Pass 1 - JavaScript
~~~javascript
function solution(survey, choices) {
    let answer = '';
    
    let map = new Map();
    
    for(let i=0;i<survey.length;i++){
        let choice = choices[i] - 4;
        if(choice < 0){
            map.set(survey[i][0], (map.get(survey[i][0]) || 0) + choice * -1);
        }
        else if(choice > 0){
             map.set(survey[i][1], (map.get(survey[i][1]) || 0) + choice);
        }
    }
    
    let list = [['R', 'T'], ['C', 'F'], ['J', 'M'], ['A', 'N']]
    for(let [a, b] of list){
        if((map.get(a) || 0) >= (map.get(b) || 0)){
            answer += a;
        }
        else{
            answer += b;
        }
    }
    
    return answer;
}
~~~
