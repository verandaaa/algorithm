https://www.acmicpc.net/problem/19598

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		long[][] total = new long[n][2];
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			total[i][0] = Integer.parseInt(st.nextToken());
			total[i][1] = Integer.parseInt(st.nextToken());
		}

		// total 시작시간 순 정렬
		Arrays.sort(total, new Comparator<long[]>() {
			@Override
			public int compare(long[] a, long[] b) {
				return Long.compare(a[0], b[0]);
			}
		});

		PriorityQueue<Long> pqueue = new PriorityQueue<>();
		int roomCount = 0;

		// 각 스케쥴에 대해서
		for (int i = 0; i < n; i++) {
			long start = total[i][0];
			long end = total[i][1];

			// 나갈 사람 내보내고
			while (!pqueue.isEmpty() && start >= pqueue.peek()) {
				pqueue.poll();
			}

			// 방이 없으면 방 추가 부여
			if (pqueue.size() == roomCount) {
				pqueue.offer(end);
				roomCount++;
			}
			// 방이 있으면 그냥 입실
			else {
				pqueue.offer(end);
			}
		}
		sb.append(roomCount);

		System.out.println(sb.toString());
	}

}

~~~
