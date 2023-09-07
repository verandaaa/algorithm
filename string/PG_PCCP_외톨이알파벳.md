# Pass 1 - JavaScript
~~~javascript
function solution(input_string) {
    let answer = "";
    
    let alone = Array.from(Array(26),()=>false);
    let set = new Set();
    
    let cur="";
    for(let x of input_string){
        if(cur!==x){
            cur = x;
            if(set.has(x)){
                alone[x.charCodeAt(0)-97] = true;
            }
            else{
                set.add(x);
            }
        }
    }
    for(let i=0;i<26;i++){
        if(alone[i]){
            answer+=String.fromCharCode(i+97);
        }
    }
    if(!answer.length){
        answer = "N"
    }
    
    return answer;
}
~~~
