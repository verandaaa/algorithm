https://school.programmers.co.kr/learn/courses/30/lessons/42579

# Solution 1 - JavsScript
~~~javascript
function solution(genres, plays) {
    let answer = [];
    let n = genres.length;
    let map = new Map();
    
    for(let i=0; i<n; i++){
        if(map.has(genres[i])){
            map.get(genres[i]).array.push(i);
            map.get(genres[i]).sum+=plays[i];
        }
        else{
            map.set(genres[i], { array : [i], sum : plays[i]});            
        }
    }
    let result = Array.from(map, ([key, value]) => ({ key, value }));
    
    result.sort((a,b)=>b.value.sum - a.value.sum);
    
    for(let i=0;i<result.length;i++){
        result[i].value.array.sort((a,b)=>plays[b]-plays[a]);
        answer = answer.concat(result[i].value.array.slice(0,2));
    }
    
    return answer;
}
~~~

잊고 있었던 자바스크립트 방식
1. map의 value값이 참조형인 경우 map.get(key).push(i); 와 같이 바로 수정이 가능하다
2. Array.from을 사용해 map을 array형식으로 변환하기
3. concat을 이용하여 배열을 이어붙일 수 있다.
