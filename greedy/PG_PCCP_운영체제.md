# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

class Solution {
    public long[] solution(int[][] program) {
        long[] answer = new long[11];
        
        //전체 프로그램의 목록 우선순위 -> 1.호출시간 2.점수
        //점수가 포함되는 이유 : curTime기준 실행가능한 프로그램이 없으면
        //다음꺼 하나 빼오는데 우선순위 높은거 뽑아야 함
        Arrays.sort(program, (a, b) -> {
            int res = Integer.compare(a[1], b[1]);
            if (res == 0) {
                return Integer.compare(a[0], b[0]);
            }
            return res;
        });
        int programIndex = 0;
        long curTime = 0;
        //실행 예정 목록의 우선순위 -> 1.점수 2.호출시간
        PriorityQueue<int[]> pqueue = new PriorityQueue<>((a, b) -> {
            int res = Integer.compare(a[0], b[0]);
            if (res == 0) {
                return Integer.compare(a[1], b[1]);
            }
            return res;
        });
        while (programIndex < program.length || !pqueue.isEmpty()) {
            //지금 시점에서 실행 가능한 프로그램 목록을 구하고
            while(programIndex < program.length && program[programIndex][1] <= curTime){
                pqueue.offer(program[programIndex++]);
            }
            //없다면 하나 빼온다
            if(pqueue.isEmpty()){
                pqueue.offer(program[programIndex++]);
            }
            //하나만 찾아서 실행
            int[] q = pqueue.poll();
            if (q[1] <= curTime) { //대기 한 프로그램
                answer[q[0]] += curTime - q[1];
                curTime += q[2];
            }
            else{ //대기 안한 프로그램
                curTime = q[1] + q[2];
            }
        }
        answer[0] = curTime;
        
        return answer;
    }
}
~~~

# Fail 1 - JavaScript
~~~javascript
function solution(program) {
    let answer = Array.from(Array(11),()=>0);
    
    program.sort((a,b)=>{
        if(a[1]===b[1]){
            return a[0]-b[0];
        }
        return a[1]-b[1];
    });
    let curTime = 0;
    let queue = [];
    while(program.length || queue.length){
        //지금 시점에서 실행 가능한 프로그램 목록을 구하고
        while(program.length && program[0][1]<=curTime){
            queue.push(program.shift());
        }
        //없다면 하나 빼온다
        if(!queue.length){
            queue.push(program.shift());
        }
        queue.sort((a,b)=>{ //우선순위에 따라 정렬
            if(a[0]===b[0]){
                return a[1]-b[1];
            }
            return a[0]-b[0];
        }); 
        //하나만 찾아서 실행
        let q = queue.shift();
        if(q[1]<=curTime){
            answer[q[0]]+=curTime - q[1];
            curTime += q[2];
        }
        else{
            curTime = q[1]+q[2];
        }
    }
    answer[0] = curTime;
    
    return answer;
}
~~~

# Fail 2 - JavaScript
~~~javascript
function solution(program) {
  let answer = Array.from(Array(11), () => 0);

  class PriorityQueue {
    constructor() {
      this.items = [];
    }

    enqueue(elemnt) {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (
          elemnt[0] < this.items[i][0] ||
          (elemnt[0] === this.items[i][0] && elemnt[1] < this.items[i][1])
        ) {
          this.items.splice(i, 0, elemnt);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(elemnt);
      }
    }
    dequeue() {
      return this.items.shift();
    }
    size() {
      return this.items.length;
    }
  }

  program.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });
  let programIndex = 0;
  let curTime = 0;
  const priorityQueue = new PriorityQueue();
  while (programIndex < program.length || priorityQueue.size()) {
    //지금 시점에서 실행 가능한 프로그램 목록을 구하고
    while (
      programIndex < program.length &&
      program[programIndex][1] <= curTime
    ) {
      priorityQueue.enqueue(program[programIndex++]);
    }
    //없다면 하나 빼온다
    if (!priorityQueue.size()) {
      priorityQueue.enqueue(program[programIndex++]);
    }
    //하나만 찾아서 실행
    let q = priorityQueue.dequeue();
    if (q[1] <= curTime) {
      answer[q[0]] += curTime - q[1];
      curTime += q[2];
    } else {
      curTime = q[1] + q[2];
    }
  }
  answer[0] = curTime;

  return answer;
}

~~~

js에서 sort로 구현하면 시간초과가 나서 우선순위 큐 구현방식 2가지(배열, 힙) 중 배열을 적용해도 시간초과가 발생  
힙으로 구현하는거는 엄두가 안나서 자바로 풀었다  
