https://www.codetree.ai/training-field/frequent-problems/problems/rudolph-rebellion?&utm_source=clipboard&utm_medium=text

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {

	static class Santa {
		int x,y;
		boolean isLife;
		int stun;
		int score;
		
		public Santa(int x, int y, boolean isLife, int stun, int score) {
			this.x = x;
			this.y = y;
			this.isLife = isLife;
			this.stun = stun;
			this.score = score;
		}

		@Override
		public String toString() {
			return "Santa [x=" + x + ", y=" + y + ", isLife=" + isLife + ", stun=" + stun + ", score=" + score
					+ "]";
		}
	}

	public static void main(String[] args) throws IOException {
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		int P = Integer.parseInt(st.nextToken());
		int C = Integer.parseInt(st.nextToken());
		int D = Integer.parseInt(st.nextToken());
		st = new StringTokenizer(br.readLine());
		int Rr = Integer.parseInt(st.nextToken())-1;
		int Rc = Integer.parseInt(st.nextToken())-1;
		
		int[][] board = new int[N][N];
		Santa[] santaList = new Santa[P+1];
		for(int i=0;i<P;i++) {
			st = new StringTokenizer(br.readLine());
			int Pn = Integer.parseInt(st.nextToken());
			int Sr = Integer.parseInt(st.nextToken())-1;
			int Sc = Integer.parseInt(st.nextToken())-1;
			
			board[Sr][Sc] = Pn;
			santaList[Pn] = new Santa(Sr,Sc,true,-1,0);
		}
		
		int[] dx = {-1,0,1,0,-1,1,1,-1};
		int[] dy = {0,1,0,-1,1,1,-1,-1};
		for(int round=1;round<=M;round++) {
			//[루돌프의 움직임]
			
			//가장 가까운 산타 찾기
			int minDis = Integer.MAX_VALUE;
			int maxR = -1;
			int maxC = -1;
			for(int i=1;i<P+1;i++) {
				if(santaList[i].isLife) { //탈락하지 않은 산타 중에서
					//조건에 맞는 1순위 산타를 찾을것임
					int dis = (santaList[i].x-Rr)*(santaList[i].x-Rr) + (santaList[i].y-Rc)*(santaList[i].y-Rc);
					if(dis<minDis) {
						minDis = dis;
						maxR = santaList[i].x;
						maxC = santaList[i].y;
					}
					else if(dis==minDis) {
						if(santaList[i].x > maxR) {
							maxR = santaList[i].x;
							maxC = santaList[i].y;
						}
						else if(santaList[i].x == maxR) {
							if(santaList[i].y > maxC) {
								maxC = santaList[i].y;
							}
						}
					}
				}
			}
			int santaIndex = board[maxR][maxC];
			
			//인접한 8방향중 어디로?
			int dir = -1;
			minDis = Integer.MAX_VALUE;
			for(int d=0;d<8;d++) {
				int nx = Rr+dx[d];
				int ny = Rc+dy[d];
				
				if(nx<0 || nx>=N || ny<0 || ny>=N) {
					continue;
				}
				int dis = (maxR-nx)*(maxR-nx) + (maxC-ny)*(maxC-ny);
				if(dis<minDis) {
					minDis = dis;
					dir = d;
				}
			}
			//루돌프 이동
			int[][] newBoard = copyBoard(board);
			Rr+=dx[dir];
			Rc+=dy[dir];
				
			//루돌프가 산타에게 충돌했다
			if(board[Rr][Rc]>0) {
				//산타는 다음턴까지 기절
				santaList[santaIndex].stun = round+1;
				//산타는 점수 +C
				santaList[santaIndex].score += C;
				//산타는 루돌프가 이동해온 방향으로 C칸 이동할 것임
				int nx = santaList[santaIndex].x + C*dx[dir];
				int ny = santaList[santaIndex].y + C*dy[dir];
				//산타가 보드 밖으로 나가면 탈락
				if(nx<0 || nx>=N || ny<0 || ny>=N) {
					newBoard[santaList[santaIndex].x][santaList[santaIndex].y]=0;
					santaList[santaIndex].isLife=false;
				}
				//산타가 착지함
				else {
					newBoard[santaList[santaIndex].x][santaList[santaIndex].y] = 0;
					santaList[santaIndex].x = nx;
					santaList[santaIndex].y = ny;
					newBoard[nx][ny] = santaIndex;
					
					//착지한 곳에 산타가 있다면 상호작용 발생	
					while(board[nx][ny]>0) {
						//밀림 당한 산타
						int pushSantaIndex = board[nx][ny];
						//1칸 밀릴 것임
						int nnx = nx+dx[dir];
						int nny = ny+dy[dir];
						//산타가 보드 밖으로 나가면 탈락
						if(nnx<0 || nnx>=N || nny<0 || nny>=N) {
							santaList[pushSantaIndex].isLife=false;
							break;
						}
						//밀린 산타 위치 조정
						santaList[pushSantaIndex].x = nnx;
						santaList[pushSantaIndex].y = nny;
						newBoard[nnx][nny] = pushSantaIndex;
						//다음 위치로
						nx=nnx;
						ny=nny;
					}
				}
			}
			//맵 복사
			board = copyBoard(newBoard);
			//printBoard(board, round+"번 턴 -루돌프");
			//System.out.printf("루돌프 : (%d %d)\n",Rr,Rc);
			
			
			//[산타의 움직임]
			
			//산타는 1번부터 P번까지 순서대로 움직입니다.
			for(int i=1;i<P+1;i++) {
				//이미 게임에서 탈락한 산타는 움직일 수 없습니다.
				if(!santaList[i].isLife) {
					continue;
				}
				//기절한 산타는 움직일 수 없습니다.
				else if(santaList[i].stun >= round) {
					continue;
				}
				
				//루돌프에게 거리가 가장 가까워지는 방향으로 1칸 이동할 예정
				dir = -1;
				minDis = (Rr-santaList[i].x)*(Rr-santaList[i].x) + (Rc-santaList[i].y)*(Rc-santaList[i].y);
				//산타는 상하좌우로 인접한 4방향 중 한 곳으로 움직일 수 있습니다. 
				for(int d=0;d<4;d++) {
					int nx = santaList[i].x+dx[d];
					int ny = santaList[i].y+dy[d];
					
					//게임판 밖으로는 움직일 수 없습니다.
					if(nx<0 || nx>=N || ny<0 || ny>=N) {
						continue;
					}
					//다른 산타가 있는 칸으로는 움직일 수 없습니다.
					if(board[nx][ny]>0) {
						continue;
					}
					
					int dis = (Rr-nx)*(Rr-nx) + (Rc-ny)*(Rc-ny);
					if(dis < minDis) {
						minDis = dis;
						dir = d;
					}
				}
				//만약 루돌프로부터 가까워질 수 있는 방법이 없다면 산타는 움직이지 않습니다.
				if(dir==-1) {
					continue;
				}
				//산타 이동
				newBoard = copyBoard(board);
				newBoard[santaList[i].x][santaList[i].y] = 0;
				santaList[i].x+=dx[dir];
				santaList[i].y+=dy[dir];
				newBoard[santaList[i].x][santaList[i].y] = i;
					
				//산타가 루돌프에게 충돌했다
				if(santaList[i].x==Rr && santaList[i].y==Rc) {
					//산타는 다음턴까지 기절
					santaList[i].stun = round+1;
					//산타는 점수 +D
					santaList[i].score += D;
					//산타는 산타가 이동해온 반대 방향으로 D칸 이동할 것임
					int nx = santaList[i].x - D*dx[dir];
					int ny = santaList[i].y - D*dy[dir];
					//산타가 보드 밖으로 나가면 탈락
					if(nx<0 || nx>=N || ny<0 || ny>=N) {
						newBoard[santaList[i].x][santaList[i].y]=0;
						santaList[i].isLife=false;
					}
					//산타가 착지함
					else {
						newBoard[santaList[i].x][santaList[i].y] = 0;
						santaList[i].x = nx;
						santaList[i].y = ny;
						newBoard[nx][ny] = i;
						
						//착지한 곳에 산타가 있다면 상호작용 발생	
						while(board[nx][ny]>0) {
							//밀림 당한 산타
							int pushSantaIndex = board[nx][ny];
							if(pushSantaIndex==i) {
								break;
							}
							//1칸 밀릴 것임
							int nnx = nx-dx[dir];
							int nny = ny-dy[dir];
							//산타가 보드 밖으로 나가면 탈락
							if(nnx<0 || nnx>=N || nny<0 || nny>=N) {
								santaList[pushSantaIndex].isLife=false;
								break;
							}
							//밀린 산타 위치 조정
							santaList[pushSantaIndex].x = nnx;
							santaList[pushSantaIndex].y = nny;
							newBoard[nnx][nny] = pushSantaIndex;
							//다음 위치로
							nx=nnx;
							ny=nny;
						}
					}
				}
				//맵 복사
				board = copyBoard(newBoard);
			}
			//printBoard(board, round+"번 턴 - 산타");
			//System.out.printf("루돌프 : (%d %d)\n",Rr,Rc);
			
			//매 턴 이후 아직 탈락하지 않은 산타들에게는 1점씩을 추가로 부여합니다.
			boolean isEnd = true;
			for(int i=1;i<P+1;i++) {
				if(santaList[i].isLife) {
					santaList[i].score++;
					isEnd = false;
				}
			}		
			//만약 P 명의 산타가 모두 게임에서 탈락하게 된다면 그 즉시 게임이 종료됩니다.
			if(isEnd) {
				break;
			}
			
		}
		//게임이 끝났을 때 각 산타가 얻은 최종 점수를 구하는 프로그램을 작성해보세요.
		StringBuffer sb = new StringBuffer();
		for(int i=1;i<P+1;i++) {
			sb.append(santaList[i].score+" ");
		}
		System.out.println(sb);
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
