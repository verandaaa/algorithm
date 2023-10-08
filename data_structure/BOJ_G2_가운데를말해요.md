https://www.acmicpc.net/problem/1655

# Pass 1 - Java
~~~javascript
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws Exception {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int n = Integer.parseInt(st.nextToken());
		
		Comparator<Integer> c1 = new Comparator<Integer>() {
			
			@Override
			public int compare(Integer o1, Integer o2) { //내림차순 정렬
				return o2.compareTo(o1);
			}
		};
		Comparator<Integer> c2 = new Comparator<Integer>() {
			
			@Override
			public int compare(Integer o1, Integer o2) { //오름차순 정렬
				return o1.compareTo(o2);
			}
		};
		
		PriorityQueue<Integer> pqueue1 = new PriorityQueue<>(c1); //작은값 [2, 1]
		PriorityQueue<Integer> pqueue2 = new PriorityQueue<>(c2); //큰값 [5, 10]
		StringBuilder sb = new StringBuilder();
		
		for(int i=0;i<n;i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int x = Integer.parseInt(st.nextToken());
			if(i%2==0) { //ex)1:1
				if(!pqueue2.isEmpty() && x>pqueue2.peek()) { //x가 2번큐의 min보다 크면
					pqueue1.offer(pqueue2.poll()); //2번큐의 min을 1번큐로 옮기고
					pqueue2.offer(x); //x를 2번큐에 넣는다
				}
				else { //그 외에는
					pqueue1.offer(x); //1번큐에 넣으면 됨
				}
			}
			else { //ex)2:1
				if(x<pqueue1.peek()) { //x가 1번큐의 max보다 작으면
					pqueue2.offer(pqueue1.poll()); //1번큐의 max를 2번큐로옮기고
					pqueue1.offer(x); //x를 1번큐에 넣는다
				}
				else { //그 외에는
					pqueue2.offer(x); //2번큐에 넣으면 됨
				}
			}
			sb.append(pqueue1.peek()).append("\n"); //sb로 해야 메모리 초과 안남
		}

		

		System.out.println(sb.toString());
	}
}
~~~
