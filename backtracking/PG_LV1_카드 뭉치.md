https://school.programmers.co.kr/learn/courses/30/lessons/159994

# Pass 1 - JavaScript
~~~javascript
function solution(cards1, cards2, goal) {
    let answer = 'No';
    
    let cards = [cards1, cards2]
    let card_usages = [new Array(cards1.length).fill(false), new Array(cards2.length).fill(false)];
    
    function dfs(end){
        if(end === goal.length){
            answer = "Yes";
        }
        
        for(let i=0;i<2;i++){
            for(let j=0;j<cards[i].length;j++){
                if(card_usages[i][j]){
                    continue;
                }
                if(cards[i][j] === goal[end]){
                    card_usages[i][j] = true;
                    dfs(end+1);
                    card_usages[i][j] = false;
                }
                else{
                    break;
                }
            }
        }
    }
    
    dfs(0);
    
    return answer;
}
~~~
