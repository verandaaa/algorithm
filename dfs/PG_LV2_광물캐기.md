https://school.programmers.co.kr/learn/courses/30/lessons/172927

# Solution 1 - Javascript

```javascript
function solution(picks, minerals) {
    let answer = Number.MAX_SAFE_INTEGER;

    minerals = minerals.map((mineral)=>{
        if(mineral==="diamond")
            return 0;
        if(mineral==="iron")
            return 1;
        if(mineral==="stone")
            return 2;
    });
    let pickCount = picks.reduce((acc,cur)=>acc+cur,0); //곡괭이 총 개수
    let mineralCount = minerals.length; //광물 총 개수
    let picked = [];
    let map = [[1,1,1],[5,1,1],[25,5,1]];

    dfs();

    function dfs(){
        //모든 곡괭이를 사용했거나, 모든 광물을 다 캤거나
        if(picked.length===pickCount || picked.length*5>=mineralCount){
            let sum=0;
            for(let i=0;i<mineralCount && i<picked.length*5;i++){
                sum+=map[picked[Math.floor(i/5)]][minerals[i]];
            }
            answer=Math.min(answer,sum);
            return;
        }
        for(let i=0;i<3;i++){
            if(picks[i]>0){
                picks[i]--;
                picked.push(i);
                dfs();
                picks[i]++;
                picked.pop();
            }
        }
    }

    return answer;
}
```
