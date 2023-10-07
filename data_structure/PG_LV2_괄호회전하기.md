https://school.programmers.co.kr/learn/courses/30/lessons/76502

# Pass 1 - JavaScript
~~~javascript
function solution(s) {
    let answer = 0;
    let ss=[];
    for(let i=0;i<s.length;i++){
        if(s[i]==="["){
            ss.push(-1);
        }
        else if(s[i]==="("){
            ss.push(-2);
        }
        else if(s[i]==="{"){
            ss.push(-3);
        }
        else if(s[i]==="]"){
            ss.push(1);
        }
        else if(s[i]===")"){
            ss.push(2);
        }
        else if(s[i]==="}"){
            ss.push(3);
        }
    }
    
    for(let x=0;x<ss.length;x++){
        let arr1 = ss.slice(x,s.length);
        let arr2 = ss.slice(0,x);
        let arr = arr1.concat(arr2);

        let stack = [];
        let flag = true;
        for(let i=0;i<arr.length;i++){
            if(arr[i]<0){
                stack.push(arr[i]);
            }
            else{
                if(stack.length && stack[stack.length-1]+arr[i]===0){
                    stack.pop();
                }
                else{
                    flag=false;
                    break;
                }
            }
        }
        if(stack.length){
            flag = false;
        }
        if(flag){
            answer++;
        }
    }
    
    return answer;
}
~~~
