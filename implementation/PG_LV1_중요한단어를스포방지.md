https://school.programmers.co.kr/learn/courses/30/lessons/468370?language=javascript

# Pass 1 - JavaScript
~~~javascript
function solution(message, spoiler_ranges) {
    let answer = 0;
    
    let key = '@'
    
    let parcedMessage = [...message.split("")]
    
    for(let [s,e] of spoiler_ranges){
        for(let i=s;i<=e;i++){
            if(parcedMessage[i] !== ' '){
                parcedMessage[i] = key
            }
        }
    }
    
    let parcedWords = parcedMessage.join("").split(" ");
    let originalWords = message.split(" ");
    
    let notParcedWordSet = new Set(parcedWords.filter((word) => !word.includes(key)))

    for(let i=0;i<parcedWords.length;i++){
        if(parcedWords[i].includes(key) && !notParcedWordSet.has(originalWords[i])){
            answer++;
            notParcedWordSet.add(originalWords[i])
        }
    }
    return answer;
}
~~~
