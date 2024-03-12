https://school.programmers.co.kr/learn/courses/30/lessons/42626

# Pass 1 - Java
~~~java
import java.util.*;

class Solution {
    public int solution(int[] scoville, int K) {
        int answer = -1;
        int count = 0;
        
        PriorityQueue<Integer> queue = new PriorityQueue<>();
        
        for(int i=0;i<scoville.length;i++){
            queue.offer(scoville[i]);
        }
        
        while(queue.peek()<K && queue.size()>=2){
            int a = queue.poll();
            int b = queue.poll();
            int c = a+b*2;
            queue.offer(c);
            count++;
        }
        
        if(queue.peek()>=K){
            answer = count;
        }
        
        return answer;
    }
}
~~~
