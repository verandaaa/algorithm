https://school.programmers.co.kr/learn/courses/30/lessons/142085

# Pass 1 - Java
~~~javascript
import java.util.*;

class Solution {
    public int solution(int n, int k, int[] enemy) {
        int answer = enemy.length;
    
        PriorityQueue<Integer> chance = new PriorityQueue<>();
        for(int i=0;i<enemy.length;i++){

            if(chance.size()<k){ //무적권 남아 있으면 쓰고
                chance.offer(enemy[i]);
            }
            else{ //없으면
                int min = chance.peek(); //제일 최소값 찾아서
                if(min<enemy[i]){ //현재 고민중인 값이 더 크다면
                    chance.poll(); //최소값 빼고
                    chance.offer(enemy[i]); //큰 값 넣고
                    n-=min; //남은 병사 감소
                }
                else{ //현재 고민중인 값이 더 작다면
                    n-=enemy[i]; //그래도 남은 병사 감소
                }
            }
            if(n<0){ //남은 병사가 음수라면 종료
                answer = i;
                break;
            }
        }

        return answer;
    }
}
~~~
