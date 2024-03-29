https://school.programmers.co.kr/learn/courses/30/lessons/172927

# Solution 1 - Javascript

```javascript
function solution(picks, minerals) {
    let answer = 0;
    
    minerals = minerals.map((mineral)=>{
        if(mineral==="diamond")
            return 0;
        if(mineral==="iron")
            return 1;
        if(mineral==="stone")
            return 2;
    });
    let pickCount = picks.reduce((acc,cur)=>acc+cur,0); //곡괭이 총 개수
    let map = [[1,1,1],[5,1,1],[25,5,1]]; //곡괭이x광물 피로도 표
    
    let slicedMineral = [];
    for(let i=0;i<minerals.length && i/5<pickCount ;i+=5){
        slicedMineral.push(minerals.slice(i,i+5)); //5개씩 묶음
    }
    
    //총 피로도 계산
    let pirodos= [];
    for(let i=0;i<slicedMineral.length;i++){ //광물 묶음 수 
        let pirodo = [];
        for(let j=0;j<3;j++){ //곡괭이 종류
            let sum=0;
            for(let k=0;k<slicedMineral[i].length;k++){ //광물 종류
                sum+=map[j][slicedMineral[i][k]];
            }
            pirodo.push(sum);
        }
        pirodos.push(pirodo);
    }
    pirodos.sort((a,b)=>{
        if(a[2]!==b[2])
            return -(a[2]-b[2]);
        if(a[1]!==b[1])
            return -(a[1]-b[1]);
        if(a[0]!==b[0])
            return -(a[0]-b[0]);
    });
    
    let picked = [];
    for(let i=0;i<3;i++){ //곡괭이 종류
        for(let j=0;j<picks[i];j++){ //곡괭이 개수
            picked.push(i);
        }
    }
    
    for(let i=0;i<pirodos.length;i++){
        answer+=pirodos[i][picked[i]];
    }

    
    return answer;
}
```

1. 모든 광물을 5개 단위로 묶음을 나눈다  
[0,1,2,3,4] [5,6,7,8,9] [10,11]  
2. 묶음에 대해서 다이아, 철, 돌 곡괭이로 캤을때 피로도를 계산한다  
[x,y,z] [x,y,z] [x,y,z]  
3. 돌>철>다이아 순으로 피로도를 정렬한다  
[x,y,z] [x,y,z] [x,y,z]  
4. 다이아>철>돌 순으로 곡괭이를 정렬한다  
[0,0,0,1,1,1,1,1,2,2,2]  
5. 피로도와 곡괭이를 매치시켜 값을 더한다  

- 여기서 주의해야 할 점은 광물은 무조건 순서대로 캐야 하기 때문에 곡괭이 수가 부족하면 뒤에 있는 광물은 캘 수 없다.  
- 따라서 곡괭이수x5만큼의 광물에 대한 피로도만 계산해야 한다.  
