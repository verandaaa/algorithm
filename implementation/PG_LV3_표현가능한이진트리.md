https://school.programmers.co.kr/learn/courses/30/lessons/150367

# Solution 1 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    answer = numbers.map((number)=> { //42
        const string = number.toString(2); //"101010"
        const stringLen = string.length; //6
        const stringLenString = stringLen.toString(2); //"110"
        const totalLen = (1<<stringLenString.length)-1; //7
        const result = "0".repeat(totalLen-string.length)+string; //"0101010"
        
        let arr = [];
        for(let i=0;i<result.length;i++){
            if(i%2===0){
                arr.push(i);
            }
        } //0 2 4 6

        while(arr.length!==1){
            let arr2 = [];
            for(let i=0;i<arr.length;i+=2){
                if(result[arr[i]]==="1" || result[arr[i+1]]==="1"){ //0 2
                    if(result[(arr[i]+arr[i+1])/2]==="0"){ //1
                        return 0;
                    }
                }
                arr2.push((arr[i]+arr[i+1])/2);
            }
            arr = arr2.slice(0,arr2.length);
        }
        return 1;
    })
    
    return answer;
}
~~~

비트연산을 알아야 풀 수 있음.
