https://www.acmicpc.net/problem/7662

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
	static PriorityQueue<Integer> queue1;
	static PriorityQueue<Integer> queue2;
	static Map<Integer, Integer> map;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int t = Integer.parseInt(st.nextToken());
		StringBuilder sb = new StringBuilder();

		for (int tc = 0; tc < t; tc++) {
			st = new StringTokenizer(br.readLine());
			int n = Integer.parseInt(st.nextToken());
			
			queue1 = new PriorityQueue<>(); // 작은거 먼저
			queue2 = new PriorityQueue<>(Collections.reverseOrder()); // 큰거 먼저
			map = new HashMap<>();

			for (int i = 0; i < n; i++) {
				st = new StringTokenizer(br.readLine());
				String opt = st.nextToken();
				int s = Integer.parseInt(st.nextToken());

				if (opt.equals("I")) { // 삽입
					add(s);
				} //
				else if (opt.equals("D")) { // 삭제
					if (s == -1) {
						delete(queue1);
					} //
					else if (s == 1) {
						delete(queue2);
					}
				}
			}
			Integer min = find(queue1);
			Integer max = find(queue2);
			
			if(min==null && max==null) {
				sb.append("EMPTY").append("\n");
			}
			else {
				sb.append(max).append(" ").append(min).append("\n");
			}
		}
		System.out.println(sb.toString());
	}

	public static void add(int s) {
		queue1.offer(s);
		queue2.offer(s);
		if (map.containsKey(s)) {
			map.put(s, map.get(s) + 1);
		} //
		else {
			map.put(s, 1);
		}
	}

	public static void delete(PriorityQueue<Integer> queue) {
		while (!queue.isEmpty()) { // 값을 map에서 뽑을때까지 반복
			int s = queue.poll(); // 값을 뽑았을때
			if (map.containsKey(s)) { // map(큐 2개의 공통 부분)에 존재 한다면
				map.put(s, map.get(s) - 1); // 1개 감소
				if (map.get(s) == 0) { // 0개라면
					map.remove(s); // 지워버린다
				}
				break;
			}
		}
	}
	
	public static Integer find(PriorityQueue<Integer> queue) {
		while (!queue.isEmpty()) { 
			int s = queue.poll(); 
			if (map.containsKey(s)) { 
				return s;
			}
		}
		return null;
	}
}
~~~

# Pass 2 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
	static TreeMap<Integer,Integer> map;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int t = Integer.parseInt(st.nextToken());
		StringBuilder sb = new StringBuilder();

		for (int tc = 0; tc < t; tc++) {
			st = new StringTokenizer(br.readLine());
			int n = Integer.parseInt(st.nextToken());
			
			map = new TreeMap<>();

			for (int i = 0; i < n; i++) {
				st = new StringTokenizer(br.readLine());
				String opt = st.nextToken();
				int s = Integer.parseInt(st.nextToken());

				if (opt.equals("I")) { // 삽입
					add(s);
				} //
				else if (opt.equals("D")) { // 삭제
					if (s == -1) {
						delete(-1);
					} //
					else if (s == 1) {
						delete(1);
					}
				}
			}
			Integer min = find(-1);
			Integer max = find(1);
			
			if(min==null && max==null) {
				sb.append("EMPTY").append("\n");
			}
			else {
				sb.append(max).append(" ").append(min).append("\n");
			}
		}
		System.out.println(sb.toString());
	}

	public static void add(int s) {
		if (map.containsKey(s)) {
			map.put(s, map.get(s) + 1);
		} //
		else {
			map.put(s, 1);
		}
	}

	public static void delete(int opt) {
		if(map.isEmpty()) {
			return;
		}
		if(opt==-1) {
			int s = map.firstKey();
			map.put(s, map.get(s)-1);
			if(map.get(s)==0) {
				map.remove(s);
			}
		}
		else if(opt==1) {
			int s = map.lastKey();
			map.put(s, map.get(s)-1);
			if(map.get(s)==0) {
				map.remove(s);
			}
		}
	}
	
	public static Integer find(int opt) {
		if(map.isEmpty()) {
			return null;
		}
		if(opt==-1) {
			return map.firstKey();
		}
		else if(opt==1) {
			return map.lastKey();
		}
		return 0;
	}
}
~~~

첫번째 방법은 두개의 오름차순, 내림차순 우선순위 큐를 만들고 해시맵으로 삭제 된 요소인지 존재 여부를 판단한다  
두번째 방법은 트리맵을 사용하여 우선순위 큐 + 맵의 역할을 동시에 하도록 한다  
