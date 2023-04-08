# Solution 1 - JAVA
~~~java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;
import java.util.ArrayList;
import java.util.LinkedList;

public class Main {
	static int n;
	static int m;
	static int[][] map;
	static int t;
	static int count;
	static Queue<Person>[] persons;
	static boolean[][] locked;
	static boolean[][] lockedSave;
	static boolean[] checked;
	static List<Pos> bases;
	static Pos[] stores;
	static int[] dx = {-1,0,0,1};
	static int[] dy = {0,-1,1,0};
	static boolean[][][] visited;

	static class Person {
		int x, y;

		public Person(int x, int y) {
			super();
			this.x = x;
			this.y = y;
		}

		@Override
		public String toString() {
			return "Person [x=" + x + ", y=" + y + "]";
		}
	}
	static class Pos{
		int x, y;

		public Pos(int x, int y) {
			super();
			this.x = x;
			this.y = y;
		}

		@Override
		public String toString() {
			return "Pos [x=" + x + ", y=" + y + "]";
		}
		
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());
		map = new int[n][n];
		t = 0;
		count = 0;
		persons = new LinkedList[m+1];
		locked=new boolean[n][n];
		lockedSave=new boolean[n][n];
		checked = new boolean[m+1];
		bases = new ArrayList<Pos>();
		stores = new Pos[m+1];
		visited = new boolean[m+1][n][n];
		
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < n; j++) {
				int x = Integer.parseInt(st.nextToken());
				if(x==0) {
					map[i][j] = 0;
				}
				else {
					map[i][j] = -1;
					bases.add(new Pos(i,j));
				}
			}
		}
		for (int i = 1; i < m + 1; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int x = Integer.parseInt(st.nextToken()) - 1;
			int y = Integer.parseInt(st.nextToken()) - 1;
			map[x][y] = i;
			stores[i] = new Pos(x,y);
			persons[i] = new LinkedList<Person>();
		}
		while (count != m) {
			t++;
			lockedSave = copyArray(locked);
			for (int i = 1; i < m + 1; i++) { //모든 사람들에 대해서
				if(checked[i]) //이미 편의점에 도착했다
					continue;
				step1(persons[i],i);
			}
			locked = copyArray(lockedSave);
			for (int i = 1; i < m + 1; i++) { //모든 사람들에 대해서
				if(checked[i]) //이미 편의점에 도착했다
					continue;
				step3(i);
			}
			locked = copyArray(lockedSave);
		}

		System.out.println(t);
	}

	public static void step1(Queue<Person> queue, int goal) {
		if(queue.size()==0)
			return;
		//1칸 움직이기
		int queueSize = queue.size();
		for(int i=0;i<queueSize;i++){
			Person p = queue.poll();
			int x = p.x;
			int y = p.y;
			
			for(int d=0;d<4;d++) {
				int nx = x+dx[d];
				int ny = y+dy[d];
				
				if(nx<0 || nx>=n || ny<0 || ny>=n)
					continue;
				if(locked[nx][ny])
					continue;
				if(visited[goal][nx][ny])
					continue;
				
				if(step2(nx,ny,goal))
					return;
				visited[goal][nx][ny]=true;
				queue.offer(new Person(nx,ny));
			}
		}
	}

	public static boolean step2(int nx, int ny, int goal) {
		if(map[nx][ny]==goal) { //편의점에 도착
			lockedSave[nx][ny]=true;
			checked[goal]=true;
			count++;
			return true;
		}
		return false;
	}

	public static void step3(int goal) {
		if(t>m || t!=goal)
			return;
		//베이스캠프 이동
		Pos store = stores[goal];
		
		Queue<Pos> queue = new LinkedList<Pos>();
		queue.offer(store);
		boolean[][] visited2 = new boolean[n][n]; 
		visited2[store.x][store.y]=true;
		
		while(!queue.isEmpty()) {
			Pos p = queue.poll();
			int x = p.x;
			int y = p.y;
			
			for(int d=0;d<4;d++) {
				int nx = x+dx[d];
				int ny = y+dy[d];
				
				if(nx<0 || nx>=n || ny<0 || ny>=n)
					continue;
				if(locked[nx][ny])
					continue;
				if(visited2[nx][ny])
					continue;
				
				if(map[nx][ny]==-1) {
					persons[goal].offer(new Person(nx, ny));
					lockedSave[nx][ny] = true;
					visited[goal][nx][ny] = true;
					return;
				}
				visited2[nx][ny]=true;
				queue.offer(new Pos(nx,ny));
			}
		}
	}
	
	public static boolean[][] copyArray(boolean[][] array){
		boolean[][] newArray = new boolean[n][n];
		for(int i=0;i<n;i++) {
			for(int j=0;j<n;j++) {
				newArray[i][j] = array[i][j];
			}
		}
		return newArray;
	}
}
~~~

**격자에 있는 사람들이 모두 이동한 뒤에 해당 칸을 지나갈 수 없어짐에 유의합니다**
