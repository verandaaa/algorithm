# Solution 1 - JAVA
~~~java
import java.io.*;
import java.util.*;

public class Main {
	static int n, m, k;
	static God[][] map;
	static boolean flag;
	static int cur;
	static God weakGod;
	static God strongGod;

	static class God {
		int x, y;
		int power, attackTime, updateTime;
		
		public God(int x, int y, int power, int attackTime, int updateTime) {
			super();
			this.x = x;
			this.y = y;
			this.power = power;
			this.attackTime = attackTime;
			this.updateTime = updateTime;
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());
		k = Integer.parseInt(st.nextToken());
		map = new God[n][m];
		for(int i=0;i<n;i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for(int j=0;j<m;j++) {
				int x = i;
				int y = j;
				int power = Integer.parseInt(st.nextToken());
				int attackTime = 0;
				int updateTime = 0;
				map[i][j] = new God(x,y,power,attackTime, updateTime);
			}
		}

		for (cur = 1; cur < k+1; cur++) {
			if (isEnd()) {
				break;
			}
			step1();
			step2();
			step3();
		}

		System.out.println(findStrongest());
	}

	private static void step1() {
		weakGod = new God(-1,-1,Integer.MAX_VALUE,-1,-1);
		for(int i=0;i<n;i++) {
			for(int j=0;j<m;j++) {
				if(map[i][j].power<=0)
					continue;
				if(map[i][j].power < weakGod.power) {
					weakGod = copyMap(map[i][j]);
				}
				else if(map[i][j].power == weakGod.power) {
					if(map[i][j].attackTime > weakGod.attackTime) {
						weakGod = copyMap(map[i][j]);
					}
					else if(map[i][j].attackTime == weakGod.attackTime) {
						if(map[i][j].x+map[i][j].y > weakGod.x+weakGod.y) {
							weakGod = copyMap(map[i][j]);
						}
						else if(map[i][j].x+map[i][j].y == weakGod.x+weakGod.y) {
							if(map[i][j].y > weakGod.y) {
								weakGod = copyMap(map[i][j]);
							}
						}
					}
				}
			}
		}
		weakGod.power += (n+m);
		weakGod.attackTime = cur;
		weakGod.updateTime = cur;
	}

	private static God copyMap(God god) {
		int x = god.x;
		int y = god.y;
		int power = god.power;
		int attackTime = god.attackTime;
		int updateTime = god.updateTime;
		
		return new God(x,y,power,attackTime,updateTime);
	}

	private static void step2() {
		strongGod = new God(Integer.MAX_VALUE,Integer.MAX_VALUE,0,Integer.MAX_VALUE,-1);
		for(int i=0;i<n;i++) {
			for(int j=0;j<m;j++) {
				if(map[i][j].power<=0)
					continue;
				if(map[i][j].power > strongGod.power) {
					strongGod = copyMap(map[i][j]);
				}
				else if(map[i][j].power == strongGod.power) {
					if(map[i][j].attackTime < strongGod.attackTime) {
						strongGod = copyMap(map[i][j]);
					}
					else if(map[i][j].attackTime == strongGod.attackTime) {
						if(map[i][j].x+map[i][j].y < strongGod.x+strongGod.y) {
							strongGod = copyMap(map[i][j]);
						}
						else if(map[i][j].x+map[i][j].y == strongGod.x+strongGod.y) {
							if(map[i][j].y < strongGod.y) {
								strongGod = copyMap(map[i][j]);
							}
						}
					}
				}
			}
		}
		//가장약한weakGod, 가장강한stronGod 신 선정 완료
		map[weakGod.x][weakGod.y].power=weakGod.power;
		map[weakGod.x][weakGod.y].attackTime=weakGod.attackTime;
		map[weakGod.x][weakGod.y].updateTime=weakGod.updateTime;
		map[strongGod.x][strongGod.y].power=strongGod.power;
		map[strongGod.x][strongGod.y].attackTime=strongGod.attackTime;
		map[strongGod.x][strongGod.y].updateTime=strongGod.updateTime;
		
		//공격개시
		int P = map[weakGod.x][weakGod.y].power;
		boolean attackSuccess = false;
		Queue<God> queue = new LinkedList<God>();
		queue.offer(weakGod);
		int[][] visited = new int[n][m];
		for(int i=0;i<n;i++) {
			for(int j=0;j<m;j++) {
				visited[i][j] = -1;
			}
		}
		visited[weakGod.x][weakGod.y] = 5; //시작점
		int[] dx = {0,1,0,-1};
		int[] dy = {1,0,-1,0};
		while(!queue.isEmpty()) {
			God g = queue.poll();
			
			if(g.x==strongGod.x && g.y==strongGod.y) {
				attackSuccess = true;
				break;
			}
			
			for(int d=0;d<4;d++) {
				int nx = g.x+dx[d];
				int ny = g.y+dy[d];
				
				if(nx<0) {
					nx=n-1;
				}
				if(nx>=n) {
					nx=0;
				}
				if(ny<0) {
					ny=m-1;
				}
				if(ny>=m) {
					ny=0;
				}
				
				if(map[nx][ny].power<=0)
					continue;
				if(visited[nx][ny]>=0)
					continue;
				
				visited[nx][ny] = d;
				queue.offer(map[nx][ny]);
			}
		}
		if(attackSuccess) {
			int nx = strongGod.x;
			int ny = strongGod.y;
			while(true) {
				if(nx==weakGod.x && ny==weakGod.y) {
					break;
				}
				map[nx][ny].power -= Math.floor(P/2);
				map[nx][ny].updateTime = cur;
				int nnx = nx + dx[(visited[nx][ny]+2)%4];
				int nny = ny + dy[(visited[nx][ny]+2)%4];		
				nx = nnx;
				ny = nny;
				if(nx<0) {
					nx=n-1;
				}
				if(nx>=n) {
					nx=0;
				}
				if(ny<0) {
					ny=m-1;
				}
				if(ny>=m) {
					ny=0;
				}
			}
			map[strongGod.x][strongGod.y].power = strongGod.power-P;
		}
		
		if(attackSuccess)
			return;
		
		int[] dx2 = {-1,1,0,0,1,1,-1,-1};
		int[] dy2 = {0,0,-1,1,1,-1,1,-1};
		map[strongGod.x][strongGod.y].power -= P;
		map[strongGod.x][strongGod.y].updateTime = cur;
		for(int d=0;d<8;d++) {
			int nx = strongGod.x+dx2[d];
			int ny = strongGod.y+dy2[d];

			if(nx<0) {
				nx=n-1;
			}
			if(nx>=n) {
				nx=0;
			}
			if(ny<0) {
				ny=m-1;
			}
			if(ny>=m) {
				ny=0;
			}
			if(nx==weakGod.x && ny==weakGod.y)
				continue;
			
			map[nx][ny].power -= Math.floor(P/2);
			map[nx][ny].updateTime = cur;
		}
		
	}

	private static void step3() {
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if(map[i][j].power<=0)
					continue;
				if(map[i][j].updateTime==cur)
					continue;
				map[i][j].power+=1;
			}			
		}
	}

	private static boolean isEnd() {
		int count = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (map[i][j].power > 0) {
					count++;
				}
			}
		}
		return count == 1 ? true : false;
	}

	private static int findStrongest() {
		int answer = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (map[i][j].power > answer) {
					answer = map[i][j].power;
				}
			}
		}
		return answer;
	}
}

~~~


God[][] map 형태 대신 List<God> godList로 사용하면 comparable을 이용해서 가장 약한 신과 가장 강한 신을 찾기가 쉬움.  
하지만 어차피 power, attackTime, updateTime을 저장하는 2차원 배열이 필요하므로 List를 사용하지 않기로 함.  
시험장에서 놓친 부분 2가지가 있다.  
첫번째, 객체도 깊은 복사를 해야 한다는 점  
두번째, 경로 공격 로직을 잘못 짰다는 점  
경로 공격의 경우 최단거리니까 처음에는 BFS로 짜면서, 경로를 List에 추가하는 형식으로 짰었는데 왜 인지는 모르겠지만 답이 안나와서 DFS로 바꾸었었다.  
DFS로 짰을때 답은 나오긴 나왔지만 BFS보다 오래걸릴게 뻔했고, 9번테케에서 무한재귀를 돌아서 결국은 해결하지 못함.  
집에와서 다시 생각해보니 BFS가 맞는 방법이라고 생각이 들었고, 경로를 메모하는 과정을 잘못 생각했었음.  
기존에는 리스트를 가져와서 복사해서 추가해서 복잡하게 경로를 저장했었다.  
2차원 visited 배열에 약->강 으로 가는 방향 d값을 저장해두고, 공격이 가능하다면 강->약 으로 역으로 경로를 찾아가며 공격하면 해결.  
