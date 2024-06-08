https://school.programmers.co.kr/learn/courses/30/lessons/68646

# Pass 1 - JavaScript
~~~javascript
function solution(a) {
    let answer = 0;
    
    let map = new Map();
    for(let i=0;i<a.length;i++){
        map.set(a[i], i); //key:수, value:인덱스
    }
    a.sort((a,b)=>a-b); //오름차순 정렬
    
    let [min, max] = [Infinity, -Infinity];
    for(let i=0;i<a.length;i++){
        let index = map.get(a[i]);
        if(index > min && index < max){
            continue;
        }
        answer++;
        min = Math.min(index, min);
        max = Math.max(index, max);
    }
    
    return answer;
}
~~~

문제 조건 상 나의 좌우 풍선들에 대해서 나 보다 크면 터트릴 수 있지만, 나 보다 작으면 일단 스탑!!  
나보다 작은게 왼쪽과 오른쪽 중 한 군데만 존재해야 한다. 나보다 작은 풍선을 터트릴 수 있는 기회는 한번뿐이니까.  
따라서 배열을 정렬해서, 나보다 작은 풍선들이 존재하는 구간을 구한다.  
만약에 구간 사이에 내가 존재한다면, 양쪽에 나보다 작은 풍선들이 존재한다는 뜻으로 터질 수 밖에 없는 풍선이 된다.  
|       | -92 | -71 | -68 | -61 | -33 | -16 | -2  | 27 | 58 | 65  |
|-------|-----|-----|-----|-----|-----|-----|-----|----|----|-----|
| index |  5  |  6  |  7  |  8  |  9  |  0  |  3  | 1  |  4 |  2  |
|  min  |  5  |  5  |  5  |  5  |  5  |  0  |  0  | 0  |  0 |  0  |
|  max  |  5  |  6  |  7  |  8  |  9  |  9  |  9  | 9  |  9 |  9  |


