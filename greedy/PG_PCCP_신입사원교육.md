https://school.programmers.co.kr/learn/courses/15009/lessons/121688

# Pass 1 - Java
~~~java
import java.util.*;
import java.io.*;

class Solution {
    public int solution(int[] ability, int number) {
        int answer = 0;
        
        PriorityQueue<Integer> pqueue = new PriorityQueue<Integer>((a,b)->a-b);
        for(int i=0;i<ability.length;i++){
            pqueue.offer(ability[i]);
            answer+=ability[i];
        }
        for(int i=0;i<number;i++){
            int a = pqueue.poll();
            int b = pqueue.poll();
            pqueue.offer(a+b);
            pqueue.offer(a+b);
            answer+=a+b;
        }
        
        return answer;
    }
}
~~~
