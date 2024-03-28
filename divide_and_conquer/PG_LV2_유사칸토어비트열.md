https://school.programmers.co.kr/learn/courses/30/lessons/148652

# Pass 1 - JavaScript
~~~javascript
function solution(n, l, r) {
    let answer = 0;
    
    //찾을 인덱스에 대해서
    for(let i=l-1;i<=r-1;i++){
        let m = i; //현재 묶음의 몇번째인가
        let c = 5**(n-1); //현재 묶음을 5개로 쪼갤 것이다
        let x = 1; //찾을 인덱스의 수는  1로 가정한다
        
        //쪼갤 묶음이 존재할때
        while(c!==0){
            //중간의 0에 걸친다면
            if(Math.floor(m/c)===2){
                x=0;
                break;
            }
            m %= c; //인덱스 갱신
            c /=5; //묶음 쪼개기
        }
        answer+=x;
    }
    
    return answer;
}
~~~


0 -> 1  
1 -> 11011  
2 -> 1101111011000001101111011  
3 -> 11011110110000011011110111101111011000001101111011000000000000000000000000011011110110000011011110111101111011000001101111011  
  
arr[3] -> arr[2]+arr[2]+"0"*5^2+arr[2]+arr[2]  
arr[2] -> arr[1]+arr[1]+"0"*5+arr[1]+arr[1]  
  
arr[2]에서 구할때, arr[1].length로 나누어 arr[1]의 몇묶음에서 왔는가 찾는다.  
2라면 0이므로 끝이다. 0,1,3,4이라면 arr[1]의 몇번째인지 들고 올라간다.   
