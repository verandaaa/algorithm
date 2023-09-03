https://www.acmicpc.net/problem/21939

# Pass 1 - Java
~~~javascript
import java.io.*;
import java.util.*;

public class Main {
	static class Problem implements Comparable<Problem> {
		int number;
		int level;

		public Problem(int number, int level) {
			this.number = number;
			this.level = level;
		}

		public int compareTo(Problem o) {
			if (this.level == o.level) {
				return Integer.compare(this.number , o.number);
			}
			return Integer.compare(this.level , o.level);
		}

		@Override
		public String toString() {
			return "Problem [number=" + number + ", level=" + level + "]";
		}

	}

	public static void main(String[] args) throws Exception {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		StringBuilder sb = new StringBuilder();
		int n = Integer.parseInt(st.nextToken());
		PriorityQueue<Problem> ascPQ = new PriorityQueue<>();
		PriorityQueue<Problem> descPQ = new PriorityQueue<>(Collections.reverseOrder());
		int[] levels = new int[100001];
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int number = Integer.parseInt(st.nextToken());
			int level = Integer.parseInt(st.nextToken());
			ascPQ.offer(new Problem(number, level));
			descPQ.offer(new Problem(number, level));
			levels[number] = level;
		}
		st = new StringTokenizer(br.readLine(), " ");
		int m = Integer.parseInt(st.nextToken());
		for (int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			String order = st.nextToken();
			if (order.equals("recommend")) {
				int what = Integer.parseInt(st.nextToken());
				if(what==-1) {
					while(true) {
						Problem p = ascPQ.peek();
						if(levels[p.number]==p.level) {
							sb.append(p.number).append("\n");
							break;
						}
						ascPQ.poll();
					}
				}
				else {
					while(true) {
						Problem p = descPQ.peek();
						if(levels[p.number]==p.level) {
							sb.append(p.number).append("\n");
							break;
						}
						descPQ.poll();
					}
				}
			}
			else if (order.equals("add")) {
				int number = Integer.parseInt(st.nextToken());
				int level = Integer.parseInt(st.nextToken());
				ascPQ.offer(new Problem(number, level));
				descPQ.offer(new Problem(number, level));
				levels[number] = level;
			}
			else if (order.equals("solved")) {
				int number = Integer.parseInt(st.nextToken());
				levels[number] = 0;
			}
		}

		System.out.println(sb.toString());
	}
}
~~~

우선순위 큐 사용 문제  
if(levels[p.number]==p.level) 여야만 하는 이유  
112번 10 등록(levles[112]=10) -> 112번 해결(levles[112]=0) -> 112번 20 등록(levles[112]=20) 과 같은 경우  
pq에 이미 없어진 112번 10에 대한 정보가 남아있으므로... 현재 levels[112]와 일치하는지 비교해야 함  
