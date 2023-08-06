https://school.programmers.co.kr/learn/courses/30/lessons/150368

# Solution 1 - JavaScript
~~~javascript
function solution(users, emoticons) {
    let answer = [0,0];
    const discount = [10,20,30,40];
    let percent = [];
    dfs();
    
    function dfs(){
        if(percent.length===emoticons.length){
            let userCount = 0;
            let totalMoney = 0;
            for(let i=0;i<users.length;i++){
                let sum = 0;
                for(let j=0;j<emoticons.length;j++){
                    if(users[i][0]<=percent[j]){
                        sum+=emoticons[j]*(100-percent[j])/100;
                    }
                }
                if(sum>=users[i][1]){
                    userCount++;
                }
                else{
                    totalMoney+=sum;
                }
            }
            if(userCount>answer[0]){
                answer[0]=userCount;
                answer[1]=totalMoney;
            }
            else if(userCount===answer[0]){
                if(totalMoney>answer[1]){
                    answer[1]=totalMoney;
                }
            }
            
            return;
        }
        for(let i=0;i<discount.length;i++){
            percent.push(discount[i]);
            dfs();
            percent.pop();
        }
    }
    
    return answer;
}
~~~
