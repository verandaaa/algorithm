https://www.acmicpc.net/problem/2075

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());

            for (int j = 0; j < n; j++) {
                int num = Integer.parseInt(st.nextToken());

                if (pq.size() < n) {
                    pq.offer(num);
                } else if (pq.peek() < num) {
                    pq.poll();
                    pq.offer(num);
                }
            }
        }

        System.out.println(pq.peek());
    }
}
~~~

우선순위 큐 사용이 필요하여 JS에서는 번거로운 문제
