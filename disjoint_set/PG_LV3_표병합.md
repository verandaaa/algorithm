https://school.programmers.co.kr/learn/courses/30/lessons/150366

# Pass 1 - JavaScript
~~~javascript
function solution(commands) {
    let answer = [];
    let parents = Array.from(Array(50*50+1),(_,i)=>i);
    let values = Array.from(Array(50*50+1),()=>null);
    
    for(let command of commands){
        command = command.split(" ");
        if(command[0]==="UPDATE"){
            if(command.length===4){
                let [r,c,value] = [command[1]*1, command[2]*1, command[3]];
                values[findRoot((r-1)*50+c)] = value;
            }
            else if(command.length===3){
                let [value1,value2] = [command[1],command[2]];
                for(let i=1;i<=2500;i++){
                    if(values[i]===value1){
                        values[i] = value2;
                    }
                }
            }
        }
        else if(command[0]==="MERGE"){
            let [r1,c1,r2,c2] = [command[1]*1, command[2]*1, command[3]*1, command[4]*1];
            let aRoot = findRoot((r1-1)*50+c1);
            let bRoot = findRoot((r2-1)*50+c2);
            let root;

            if(aRoot<bRoot){
                parents[bRoot] = aRoot;
                root = aRoot;
            }
            else if(aRoot>bRoot){
                parents[aRoot] = bRoot;
                root = bRoot;
            }

            if(values[aRoot] && !values[bRoot]){ //a만
                values[root] = values[aRoot];
            }
            else if(!values[aRoot] && values[bRoot]){ //b만
                values[root] = values[bRoot];
            }
            else if(values[aRoot] && values[bRoot]){ //a,b 둘다
                values[root] = values[aRoot];
            }
        }
        else if(command[0]==="UNMERGE"){
            let [r,c] = [command[1]*1, command[2]*1];
            let value = values[findRoot((r-1)*50+c)];
            let root = findRoot((r-1)*50+c);
            let check = [];
            for(let i=1;i<=2500;i++){
                if(findRoot(i)===root){
                    check.push(i);
                }
            }
            for(let i of check){
                parents[i] = i;
                values[i] = null;
            }
            values[(r-1)*50+c] = value;
        }
        else if(command[0]==="PRINT"){
            let [r,c] = [command[1]*1, command[2]*1];
            let value = values[findRoot((r-1)*50+c)];
            answer.push(value ? value : "EMPTY")
        }
        // console.log("-> " + command.join(" ") + " -----------------------")
        // print(parents);
        // print(values);
    }

    function findRoot(x){
        if(x===parents[x]){
            return x;
        }
        return findRoot(parents[x]);
    }
    
    // function print(array){
    //     let string = "";
    //     for(let i=1;i<=2;i++){
    //         for(let j=1;j<=2;j++){
    //             string+= array[(i-1)*50+j]+" ";
    //         }
    //         string+= '\n';
    //     }
    //     console.log(string);
    // }
    
    return answer;
}
~~~
