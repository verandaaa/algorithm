# Pass 1 - JavaScript
~~~javascript
function solution(ability) {
    let answer = 0;
    
    let n = ability[0].length;
    let m = ability.length;
    let map = Array.from(Array(n),()=>Array(m));
    for(let j=0;j<m;j++){
        for(let i=0;i<n;i++){
            map[i][j] = ability[j][i];
        }
    }
    let check = Array.from(Array(m),()=>false);
    dfs(0,0);
    
    function dfs(end,sum){
        if(end===n){
            answer=Math.max(answer, sum);
            return;
        }
        for(let i=0;i<m;i++){
            if(!check[i]){
                check[i]=true;
                dfs(end+1, sum+map[end][i]);
                check[i]=false;
            }
        }
    }
    
    return answer;
}
~~~
