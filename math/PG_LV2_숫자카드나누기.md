https://school.programmers.co.kr/learn/courses/30/lessons/135807

# Pass 1 - JavaScript
~~~javascript
function solution(arrayA, arrayB) {
    let answer = 0;
    
    //각 array의 최대공약수, 최소공배수 구하기
    let gcdA = arrayA[0];
    for(let i=1;i<arrayA.length;i++){
        gcdA = gcd(gcdA, arrayA[i]);
    }
    let gcdB = arrayB[0];
    for(let i=1;i<arrayB.length;i++){
        gcdB = gcd(gcdB, arrayB[i]);
    }
    let [lcmA, lcmB] = [lcm(arrayA,gcdA),lcm(arrayB,gcdB)];
    
    //상대방의 최소공배수가 나의 최대공약수로 떨어지지 않아야함
    if(gcdA > gcdB){
        if(lcmB%gcdA!==0){
            answer = gcdA;
        }
        else if(lcmA%gcdB!==0){
            answer = gcdB;
        }
    }
    else if(gcdA < gcdB){
        if(lcmA%gcdB!==0){
            answer = gcdB;
        }
        else if(lcmB%gcdA!==0){
            answer = gcdA;
        }
    }
    
    return answer;
}

function gcd(a,b){
    if(b===0){
        return a;
    }
    return gcd(b,a%b);
}

function lcm(array, gcdVal){
    let total = 1;
    for(let x of array){
        total *= x;
    }
    total /= Math.pow(gcdVal, array.length-1);
    
    return total;
}
~~~
