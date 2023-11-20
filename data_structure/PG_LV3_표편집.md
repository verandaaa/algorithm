https://school.programmers.co.kr/learn/courses/30/lessons/81303

# Pass 1 - JavaScript
~~~javascript
function solution(n, k, cmd) {
    let answer = "";
    
    class Node {
        constructor(value,prev,next){
            this.value = value;
            this.prev = prev;
            this.next = next;
        }
    }
    
    let list = Array.from(Array(n),(_,i)=>new Node(i,i-1,i+1));
    list[0].prev = null;
    list[n-1].next = null;
    
    let cur = k; //현재 몇번째 인덱스를 가르키고 있는가
    let stack = [];
    for(let line of cmd){
        let [opt, x] = line.split(" ");
        if(opt==="U"){
            for(let i=0;i<x;i++){
                cur = list[cur].prev;
            }
        }
        else if(opt==="D"){
            for(let i=0;i<x;i++){
                cur = list[cur].next;
            }
        }
        else if(opt==="C"){ 
            let curPrev = list[cur].prev;
            let curNext = list[cur].next;

            stack.push([cur, curPrev, curNext]);
            
            list[cur].value=null;
            
            if(curPrev===null){
                list[curNext].prev = curPrev;
                
                cur=curNext;
            }
            else if(curNext===null){
                list[curPrev].next = curNext;
                
                cur=curPrev;
            }
            else {
                list[curPrev].next = curNext;
                list[curNext].prev = curPrev;
                
                cur=curNext;
            }
        }
        else if(opt==="Z"){ 
            let [tgt, tgtPrev, tgtNext] = stack.pop();
            if(tgtPrev===null){
                list[tgtNext].prev = tgt;
            }
            else if(tgtNext===null){
                list[tgtPrev].next = tgt;      
            }
            else{
                list[tgtPrev].next = tgt;
                list[tgtNext].prev = tgt;
            }
            list[tgt].value = tgt;
        }
    }  
    for(let i=0;i<n;i++){
        answer += list[i].value!==null ? "O" : "X";
    }
    
    return answer;
}
~~~

linkedList 형식으로 짠 코드  
맨 처음 말고는 인덱스가 의미가 없으니 prev와 next로만 이동해야한다  

# Pass 2 - Java
~~~javascript
import java.util.*;

class Solution {
    private Stack<Integer> s = new Stack<>();
    public String solution(int n, int k, String[] cmd) {
        int size = n;
        for(int i=0; i<cmd.length; i++){
            String[] options = cmd[i].split(" ");
            switch(options[0]){
                case "U":
                    k-=Integer.parseInt(options[1]);
                    break;
                case "D":
                    k+=Integer.parseInt(options[1]);
                    break;
                case "C":
                    s.push(k);
                    size-=1;
                    if(k == size) k-=1;
                    break;
                case "Z":
                    if(s.pop() <= k) k+=1;
                    size+=1;
                    break;
            }
        }
        
        StringBuilder sb = new StringBuilder("");
        for(int i=0; i<size; i++) sb.append("O");
        while(!s.isEmpty()) sb.insert(s.pop(), "X");
        
        return sb.toString();
    }
}
~~~
벽 느낀 풀이... 이해는 했는데 어렵다...  
몇 '번째' 인가에 중점을 두었음  
