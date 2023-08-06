https://school.programmers.co.kr/learn/courses/30/lessons/176962

# Solution 1 - Javascript
~~~javascript
function solution(plans) {
    //a:대기중, b:진행중, :보류중, d:완료
    let a = Array.from({length:1440},()=>undefined);
    plans.forEach((plan)=>{
        let start = plan[1].split(':')[0]*60+plan[1].split(':')[1]*1;
        a[start] = { 
            name : plan[0],
            playtime : plan[2]*1,
        };
    });
    let b = undefined;
    let c = [];
    let d = [];
    let i = 0;
    while(d.length!==plans.length){
        if(a[i]) { //새로운 일을 할 시간이다
            if(b){ //진행중인 일이 있다
                c.push(b);
                b=a[i];
                doWork();
            }
            else{ //진행중인 일이 없다
                b=a[i];
                doWork();
            }
        }
        else { //새로운 일이 없다
            if(b){ //진행중인 일이 있다
                doWork();
            }
            else{ //진행중인 일이 없다
                if(c.length){ //잠시 멈춘 과제가 있다
                    b = c.pop();
                    doWork();
                }
            }
        }
        i++;
    }
    function doWork(){ //과제 수행
        b.playtime--;
        if(b.playtime===0){
            d.push(b.name);
            b=undefined;
        }
    }
    
    return d;
}
~~~

쉬운 문제라고 생각했으나 while 대신 for문을 1440번 돌려 문제가 풀리지 않았다.  
문제에서 주어진 ~23:59는 시작 시간일 뿐이라서, 과제 수행하는 시간을 고려하면 자정이 넘은 시간까지 계속 과제를 할 수 있다는 점을 간과하였다.  
while문을 사용하여 모든 과제가 끝날때까지 1분 단위로 확인하도록 하였다.  
