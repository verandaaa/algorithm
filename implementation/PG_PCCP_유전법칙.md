https://school.programmers.co.kr/learn/courses/15008/lessons/121685

# Pass 1 - JavaScript
~~~javascript
function solution(queries) {
    var answer = [];
    let RrResult = ["RR","Rr","Rr","rr"];
    
    for(let [n,p] of queries){
        let arr = Array.from(Array(n+1),()=>0);
        arr[n] = p;
        for(let i=n-1;i>=1;i--){
            arr[i]=Math.ceil(arr[i+1]/4);
        }
        let parent = "Rr";
        for(let i=2;i<=n;i++){
            if(parent==="Rr"){
                parent=RrResult[(arr[i]-1)%4];
            }
        }
        answer.push(parent);
    }
    
    return answer;
}
~~~
