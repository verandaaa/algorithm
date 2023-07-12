https://school.programmers.co.kr/learn/courses/30/lessons/77885

# Pass 1 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    for(let number of numbers){
        let string = number.toString(2).split(""); //10진수 -> 2진수
        let first_zero_index = -1;
        for(let i=string.length-1;i>=0;i--){ //뒤에서 부터 시작해서
            if(string[i]==='0'){ //최초의 0이 발견되면
                first_zero_index = i;
                string[i] = '1'; //1로 바꾼다
                break;
            }
        }
        if(first_zero_index===-1){ //0이 한번도 발견되지 않았다면 
            string.unshift("1"); //맨 앞에 1을 추가한다
            first_zero_index=0;
        }
        if(first_zero_index+1 < string.length) 
            string[first_zero_index+1] = '0'; //바뀐자리 다음은 무조건 1일수밖에 없다. 0으로 바꿔서 최대한 작게 만든다

        
        string = string.join("");
        answer.push(parseInt(string,2)); //2진수 -> 10진수
    }
    
    return answer;
}

~~~
수가 극단적으로 크다면 완전탐색 말고 규칙 먼저 찾기  
let first_zero_index가 0이면 안되는 이유 => 1, 11, 111... 만 생각하고 0이 곧 미발견으로 둬도 상관 없다고 생각했었으나, number가 0인 경우 fzi가 0이 가능하다. 


# Fail 1 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    for(let number of numbers){
        for(let x=number+1;;x++){
            let string = (number^x).toString(2);
            let count = getCount(string);
            if(count>=1 && count<=2){
                answer.push(x);
                break;
            }
        }
    }
    
    return answer;
}

function getCount(string){
    let count = 0;
    for(let x of string){
        if(x==="1"){
            count++;
        }
    }
    return count;
}
~~~
10,11번 실패  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR  
JS에서 XOR연산은 최대 32비트까지 가능하기 때문에, 원하는 답을 구할 수 없었다.  
BigInts의 경우 잘림이 없다고 하여 적용해보았으나 시간초과가 발생하였다.  


# Fail 2 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    for(let number of numbers){
        for(let x=number+1;;x++){
            let s1 = number.toString(2);
            let s2 = x.toString(2);
            s1 = "0".repeat(s2.length-s1.length) + s1;
            
            let count = getCount(s1, s2);
            if(count>=1 && count<=2){
                answer.push(x);
                break;
            }
        }
    }
    
    return answer;
}

function getCount(s1, s2){
    let count = 0;
    
    for(let i=0;i<s1.length;i++){
        if(s1[i]!==s2[i]){
            count++;
            if(count>2){
                break;
            }
        }
    }
    
    return count;
}
~~~
두 수를 2진수로 변환하여 일일이 자리를 확인하도록 했는데 시간초과 발생  

# Fail 3 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    for(let number of numbers){
        for(let x=number+1;;x++){
            let s1 = number.toString(2);
            let s2 = x.toString(2);
            s1 = "0".repeat(s2.length-s1.length) + s1;
            
            let count=0;
            for(let i=0;i<s1.length;i+=32){
                let n1 = parseInt(s1.substr(i,i+32),2);
                let n2 = parseInt(s2.substr(i,i+32),2);
                let string = (n1^n2).toString(2);
                count+= getCount(string);
            }
            

            if(count>=1 && count<=2){
                answer.push(x);
                break;
            }
        }
    }
    
    return answer;
}

function getCount(string){
    let count = 0;
    for(let x of string){
        if(x==="1"){
            count++;
        }
    }
    return count;
}
~~~
비트연산 자체는 속도가 빠르니 32자리씩 끊어서 비교해보는 방식을 사용했으나 시간초과  

# Fail 4 - JavaScript
~~~javascript
function solution(numbers) {
    let answer = [];
    
    for(let number of numbers){
        for(let x=number+1;;x++){
            let count = 0;
            
            let string1 = (number^x).toString(2);
            count += getCount(string1);
            
            if(x.toString(2).length>32){
                console.log("!");
                let string2 = ((number>>32) ^ (x>>32)).toString(2);
                count += getCount(string2);
            }
            if(count>=1 && count<=2){
                answer.push(x);
                break;
            }
        }
    }
    
    return answer;
}

function getCount(string){
    let count = 0;
    for(let x of string){
        if(x==="1"){
            count++;
        }
    }
    return count;
}
~~~
number는 최대 64비트 초과할 수는 없으니 뒷 32비트 + 앞 남은 비트 이렇게 나누어서 count를 세려고 했으나 number>>32에서 -값 발생하여 오답  
