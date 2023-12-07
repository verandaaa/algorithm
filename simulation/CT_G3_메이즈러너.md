https://www.codetree.ai/training-field/frequent-problems/problems/maze-runner?&utm_source=clipboard&utm_medium=text

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {

	static class Pos {
		int x,y;
		boolean isOut;
		
		public Pos(int x, int y, boolean isOut) {
			this.x = x;
			this.y = y;
			this.isOut = isOut;
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		int K = Integer.parseInt(st.nextToken());
		int[][] board = new int[N][N];
		for(int i=0;i<N;i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0;j<N;j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		Pos[] people = new Pos[M+1];
		for(int i=1;i<M+1;i++) {
			st = new StringTokenizer(br.readLine());
			int x = Integer.parseInt(st.nextToken())-1;
			int y = Integer.parseInt(st.nextToken())-1;
			people[i] = new Pos(x,y,false);
		}
		st = new StringTokenizer(br.readLine());
		int er = Integer.parseInt(st.nextToken())-1;
		int ec = Integer.parseInt(st.nextToken())-1;
		
		int[] dx = {-1,1,0,0};
		int[] dy = {0,0,-1,1};
		int answer = 0;
		for(int time=0;time<K;time++) {
			//참가자 이동
			for(int i=1;i<M+1;i++) {
				if(people[i].isOut) {
					continue;
				}
				//남아있는 참가자에 대해서 방향 탐색
				int min = Math.abs(er-people[i].x)+Math.abs(ec-people[i].y);
				int dir = -1;
				for(int d=0;d<4;d++) {
					int nx = people[i].x+dx[d];
					int ny = people[i].y+dy[d];
					
					if(nx<0 || nx>=N || ny<0 || ny>=N) {
						continue;
					}
					if(board[nx][ny]>0) {
						continue;
					}
					
					int dis = Math.abs(er-nx)+Math.abs(ec-ny);
					
					if(dis<min) {
						min = dis;
						dir = d;
					}
				}
				//이동 가능하다
				if(dir!=-1) {
					people[i].x+=dx[dir];
					people[i].y+=dy[dir];
					answer++;
					if(people[i].x==er && people[i].y==ec) {
						people[i].isOut=true;
					}
				}
			}
			//전부다 탈출했으면 게임 종료
			boolean isEnd = true;
			for(int i=1;i<M+1;i++) {
				if(!people[i].isOut) {
					isEnd = false;
				}
			}
			if(isEnd) {
				break;
			}
			
			//작은 정사각형 구하기
			int recSize = Integer.MAX_VALUE;
			int recX = Integer.MAX_VALUE;
			int recY = Integer.MAX_VALUE;
			
			for(int i=1;i<M+1;i++) {
				if(people[i].isOut) {
					continue;
				}
				int height = Math.abs(people[i].x-er)+1;
				int width = Math.abs(people[i].y-ec)+1;
				int size = Math.max(height, width);
				
				int minX = Math.min(people[i].x, er);
				int maxX = Math.max(people[i].x, er);
				int minY = Math.min(people[i].y, ec);
				int maxY = Math.max(people[i].y, ec);
				
				//위로 넓히기
				while(height!=size && minX-1>=0) {
					minX--;
					height++;
				}
				//아래로 넓히기
				while(height!=size && maxX+1<N) {
					maxX++;
					height++;
				}
				//왼쪽으로 넓히기
				while(width!=size && minY-1>=0) {
					minY--;
					width++;
				}
				//오른족으로 넓히기
				while(width!=size && maxY+1<N) {
					maxY++;
					width++;
				}
				
				if(size<recSize) {
					recSize = size;
					recX = minX;
					recY = minY;
				}
				else if(size==recSize) {
					if(minX<recX) {
						recX = minX;
						recY = minY;
					}
					else if(minX==recX) {
						if(minY<recY) {
							recY = minY;
						}
					}
				}
			}
			//board 회전 후 벽 1 감소
			int[][] saveBoard = copyBoard(board);
			for(int x=0;x<recSize;x++) {
				for(int y=0;y<recSize;y++) {
					board[x+recX][y+recY] = saveBoard[recSize-1-y+recX][x+recY];
					if(board[x+recX][y+recY]>0) {
						board[x+recX][y+recY]--;
					}
				}
			}
			//사람 회전
			for(int i=1;i<M+1;i++) {
				if(people[i].isOut) {
					continue;
				}
				if(people[i].x<recX) {
					continue;
				}
				if(people[i].x>=recX+recSize) {
					continue;
				}
				if(people[i].y<recY) {
					continue;
				}
				if(people[i].y>=recY+recSize) {
					continue;
				}
				int copyPr = people[i].x-recX;
				int copyPc = people[i].y-recY;
				people[i].x = copyPc+recX;
				people[i].y = recSize-1-copyPr+recY;
			}
			
			//출구 회전
			int copyEr = er-recX;
			int copyEc = ec-recY;
			er = copyEc+recX;
			ec = recSize-1-copyEr+recY;
			
			//printBoard(board,time+1+"");
		}
		System.out.println(answer);
		System.out.println((er+1)+" "+(ec+1));
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

회전시 특정 구간에 대해서만 회전을 수행해야 하므로 recX,recY는 빼놓고 나중에 더해주도록 한다  
배열을 회전할때는 현재 위치에 미래의 위치를 넣는 것이다. ex)(0,0)은 (1,0)으로 부터 값을 가져온다. => x=size-1-y, y=x  
사람과 출구를 회전할때는 현재 위치가 미래의 위치가 되는 것이다. ex)(0,0)은 (1,0)이 된다. => x=y, y=size-1-x  
따라서 둘의 x,y를 바꾸어 역으로 성립하도록 해야함  
