https://www.acmicpc.net/problem/17142

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Solution {

	static class Pos {
		int x,y;

		public Pos(int x, int y) {
			super();
			this.x = x;
			this.y = y;
		}
	}
	static List<Pos> vList;
	static int N,M;
	static int[][] saveBoard;
	static int[] vCheck;
	static int[] dx = {-1,1,0,0};
	static int[] dy = {0,0,-1,1};
	static int answer;
	static int emptyPlace = 0;

	public static void main(String[] args) throws IOException {
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		StringTokenizer st = new StringTokenizer(br.readLine());
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		saveBoard = new int[N][N];
		vList = new ArrayList<>();
		vCheck = new int[M];
		
		for(int i=0;i<N;i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0;j<N;j++) {
				saveBoard[i][j] = Integer.parseInt(st.nextToken());
				if(saveBoard[i][j]==2) {
					vList.add(new Pos(i,j)); //바이러스 리스트에 추가
				}
				else if(saveBoard[i][j]==0) {
					emptyPlace++; //채워야 할 빈 공간
				}
			}
		}
		answer = Integer.MAX_VALUE;
		dfs(0,0);
		
		answer = answer==Integer.MAX_VALUE ? -1 : answer; //전부 퍼트릴 수 없다
		
		System.out.println(answer);
		
	}
	
	public static void dfs(int end, int start) { //조합으로 활성화 할 바이러스 선택
		if(end==M) {
			bfs();
			return;
		}
		for(int i=start;i<vList.size();i++) {
			vCheck[end]=i;
			dfs(end+1, i+1);
		}
	}
	
	public static void bfs() {
		int dis = 0;
		int count = 0;
		int[][] board = copyBoard(saveBoard);
		Queue<Pos> queue = new LinkedList<>();
		int[][] visit = new int[N][N];
		for(int i=0;i<N;i++) {
			for(int j=0;j<N;j++) {
				visit[i][j] = Integer.MAX_VALUE;
			}
		}
		//활성화 된 바이러스에 대해 초기화
		for(int i=0;i<M;i++) {
			int vx = vList.get(vCheck[i]).x;
			int vy = vList.get(vCheck[i]).y;
			visit[vx][vy] = 0;
			queue.offer(new Pos(vx,vy));
		}
		
		while(!queue.isEmpty()) {
			Pos p = queue.poll();
			int x = p.x;
			int y = p.y;
			
			for(int d=0;d<4;d++) {
				int nx = x+dx[d];
				int ny = y+dy[d];
				
				if(nx<0 || nx>=N || ny<0 || ny>=N) { //보드 이탈
					continue;
				}
				if(board[nx][ny]==1) { //벽
					continue;
				}
				if(visit[x][y]+1>=visit[nx][ny]) { //최단거리
					continue;
				}
				if(count==emptyPlace) { //이미 다 퍼트림
					continue;
				}
				if(board[nx][ny]==0) { //퍼트림 카운트 증가
					count++;
				}
				visit[nx][ny]=visit[x][y]+1;
				dis = visit[nx][ny];
				queue.offer(new Pos(nx,ny));
			}
		}
		if(count!=emptyPlace) { //다 퍼트리지 못했다면
			return;
		}
		//다 퍼트렸다면 거리의 최대값을 answer과 비교
		answer = Math.min(answer, dis);
		return;
	}

	public static void printBoard(int[][] board, String str) {
		int size = board.length;
		System.out.println(str + "---------------------------");
		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				System.out.print(board[i][j] + " ");
			}
			System.out.println();
		}
	}
	
	public static int[][] copyBoard(int[][] original) {
		int size = original.length;
		int[][] copy = new int[size][size];
		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				copy[i][j] = original[i][j];
			}
		}
		return copy;
	}
}
~~~
