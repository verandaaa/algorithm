https://school.programmers.co.kr/learn/courses/30/lessons/161990

# Pass 1 - JavaScript
~~~javascript
function solution(wallpaper) {
    let answer = [];
    
    let n = wallpaper.length;
    let m = wallpaper[0].length;
    
    let [top, left, bottom, right] = [Infinity, Infinity, -1, -1];
    
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(wallpaper[i][j] === '.'){
                continue;
            }
            top = Math.min(top, i);
            left = Math.min(left, j);
            bottom = Math.max(bottom, i);
            right = Math.max(right, j);
        }
    }
    bottom += 1;
    right += 1;
    
    answer = [top, left, bottom, right]
    
    return answer;
}
~~~
