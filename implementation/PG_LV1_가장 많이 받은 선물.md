https://school.programmers.co.kr/learn/courses/30/lessons/258712

# Pass 1 - JavaScript
~~~javascript
function solution(friends, gifts) {
    let answer = 0;
    
    let n = friends.length;
    
    let map = new Map();
    for(let i=0;i<n;i++){
        map.set(friends[i], i);
    }
    
    let table = new Array(n).fill().map(() => new Array(n).fill(0))
    let score = new Array(n).fill(0)
    for(let gift of gifts){
        let [a, b] = gift.split(" ");
        table[map.get(a)][map.get(b)]+=1;
        score[map.get(a)]+=1;
        score[map.get(b)]-=1;
    }
    
    let result = new Array(n).fill(0);
    for(let i=0;i<n;i++){
        for(let j=i+1;j<n;j++){
            if(table[i][j] > table[j][i]){
                result[i]++;
            }
            else if(table[i][j] < table[j][i]){
                result[j]++;
            }
            else{
                if(score[i] > score[j]){
                    result[i]++;
                }
                else if(score[i] < score[j]){
                    result[j]++;
                }
            }
        }
    }
    console.log(result)
    
    answer = Math.max(...result)

    
    return answer;
}
~~~
