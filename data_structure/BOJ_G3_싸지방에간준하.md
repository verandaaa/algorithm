https://www.acmicpc.net/problem/12764

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
	static class Time implements Comparable<Time>{
		int start;
		int end;
		
		public Time(int start, int end) {
			super();
			this.start = start;
			this.end = end;
		}

		@Override
		public int compareTo(Time time) {
			return this.start - time.start;
		}

		@Override
		public String toString() {
			return "Time [start=" + start + ", end=" + end + "]";
		}
	}
	static class Ing implements Comparable<Ing>{
		int end;
		int number;
			
		public Ing(int end, int number) {
			super();
			this.end = end;
			this.number = number;
		}

		@Override
		public int compareTo(Ing ing) {
			return this.end - ing.end;
		}
	}
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());

		Time[] totalList = new Time[n];
		for(int i=0;i<n;i++) {
			st = new StringTokenizer(br.readLine());
			int start = Integer.parseInt(st.nextToken());
			int end = Integer.parseInt(st.nextToken());
			totalList[i] = new Time(start, end);
		}
		Arrays.sort(totalList);
		
		PriorityQueue<Integer> emptyList = new PriorityQueue<>();
		PriorityQueue<Ing> ingList = new PriorityQueue<>();
		int computerCount = 0;
		int totalListIndex = 0;
		List<Integer> computerList = new ArrayList<>();
		computerList.add(-1);
		
		for(int time=0;time<=1000000;time++) {
			//퇴실할 손님이 있다
			if(!ingList.isEmpty() && time == ingList.peek().end) {
				//현황 리스트에서 삭제
				Ing ing = ingList.poll();
				//빈 자리에 추가
				emptyList.offer(ing.number);
			}
			
			//입실할 손님이 들어왔다
			if(totalListIndex<n && time == totalList[totalListIndex].start) {
				int number;
				//빈자리가 없다면
				if(emptyList.size()==0) {
					//컴퓨터 추가
					number = ++computerCount;
					computerList.add(0);
				}
				else {
					//빈 앞 자리 안내
					number = emptyList.poll();
				}
				//현재 현황 리스트에 추가
				ingList.offer(new Ing(totalList[totalListIndex].end, number));
				//컴퓨터 사용 메모
				computerList.set(number, computerList.get(number)+1);
				//다음 손님 체크
				totalListIndex++;
			}
		}
		
		sb.append(computerCount).append("\n");
		for(int i=1;i<=computerCount;i++) {
			sb.append(computerList.get(i)).append(" ");
		}

		
		System.out.println(sb.toString());
	}
}
~~~
