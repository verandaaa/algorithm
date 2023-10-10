https://www.acmicpc.net/problem/17396

# Pass 1 - Java
~~~javascript
import java.io.*;
import java.util.*;

public class Main {
	static class Node implements Comparable<Node>{
		int index;
		long val;
		
		public Node(int point, long val) {
			this.index = point;
			this.val = val;
		}

		@Override
		public int compareTo(Node o) {
			return Long.compare(this.val, o.val);
		}
	}
	
	public static void main(String[] args) throws Exception {
		long answer = 0;

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		int[] arr = new int[n];
		long[] distance =  new long[n];
		ArrayList<Node>[] edges = new ArrayList[n];
		st = new StringTokenizer(br.readLine(), " ");
		for(int i=0;i<n;i++) {
			arr[i] = Integer.parseInt(st.nextToken());
			distance[i] = Long.MAX_VALUE;
			edges[i] = new ArrayList<>();
		}
		arr[n-1]=0;
		distance[0]=0;
		
		for(int i=0;i<m;i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			int weight = Integer.parseInt(st.nextToken());
			if(arr[from]==1 || arr[to]==1) {
				continue;
			}
			edges[from].add(new Node(to, weight));
			edges[to].add(new Node(from, weight));
		}
		
		boolean[] visit = new boolean[n];
		PriorityQueue<Node> pqueue = new PriorityQueue<>();
		pqueue.offer(new Node(0,0));
		while(!pqueue.isEmpty()) {
			Node cur = pqueue.poll();
			if(visit[cur.index]) {
				continue;
			}
			visit[cur.index]=true;
			for(int i=0;i<edges[cur.index].size();i++) {
				Node next = edges[cur.index].get(i);
				if(distance[cur.index]+next.val < distance[next.index]) {
					distance[next.index] = distance[cur.index]+next.val;
					pqueue.offer(new Node(next.index,distance[next.index]));
				}
			}
		}
		answer = distance[n-1]==Long.MAX_VALUE ? -1 : distance[n-1];
		
		
		System.out.println(answer);
	}
}
~~~

다익스트라에는 두가지 방법이 존재한다.  
첫번째는 리스트 기반으로 최대 O(V^2)의 시간이 걸린다.  
두번째는 우선순위 큐 기반으로 최대 O(ElogV)의 시간이 걸린다.  
리스트로 풀면 시간초과가 나서, 우선순위 큐로 풀어야 했다.  
