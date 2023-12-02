https://www.codetree.ai/training-field/frequent-problems/problems/royal-knight-duel?&utm_source=clipboard&utm_medium=text

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {

	static class Info {
		int r, c, h, w, k, k_save;

		public Info(int r, int c, int h, int w, int k, int k_save) {
			this.r = r;
			this.c = c;
			this.h = h;
			this.w = w;
			this.k = k;
			this.k_save = k_save;
		}
	}

	static class Pos {
		int x, y;

		public Pos(int x, int y) {
			this.x = x;
			this.y = y;
		}
	}

	public static void main(String[] args) throws IOException {
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int L = Integer.parseInt(st.nextToken());
		int N = Integer.parseInt(st.nextToken());
		int Q = Integer.parseInt(st.nextToken());

		// 덫 혹은 벽의 위치 메모
		int[][] trap = new int[L][L];
		for (int i = 0; i < L; i++) {
			st = new StringTokenizer(br.readLine());
			for (int j = 0; j < L; j++) {
				trap[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		// 기사의 정보 메모
		int[][] knight = new int[L][L];
		Info[] info = new Info[N + 1];
		for (int i = 1; i < N + 1; i++) {
			st = new StringTokenizer(br.readLine());
			int r = Integer.parseInt(st.nextToken()) - 1;
			int c = Integer.parseInt(st.nextToken()) - 1;
			int h = Integer.parseInt(st.nextToken());
			int w = Integer.parseInt(st.nextToken());
			int k = Integer.parseInt(st.nextToken());

			for (int x = r; x < r + h; x++) {
				for (int y = c; y < c + w; y++) {
					knight[x][y] = i;
				}
			}

			info[i] = new Info(r, c, h, w, k, k);
		}

		// 상우하좌
		int[] dx = { -1, 0, 1, 0 };
		int[] dy = { 0, 1, 0, -1 };
		// 각 명령에 대해
		for (int i = 0; i < Q; i++) {
			st = new StringTokenizer(br.readLine());
			int who = Integer.parseInt(st.nextToken());
			int where = Integer.parseInt(st.nextToken());

			// 죽은 병사는 반응이 없다
			if (info[who].k < 0) {
				continue;
			}

			// 기본적으로 병사는 이동 가능함을 전제로 한다
			boolean flag = true;
			// 움직인 병사에 대한 체크
			boolean[] move = new boolean[N + 1];
			move[who] = true;
			// 좌표에 따라 bfs 도는 큐
			Queue<Pos> queue = new LinkedList<>();
			queue.offer(new Pos(info[who].r, info[who].c));
			// 방문한 좌표
			boolean[][] visit = new boolean[L][L];
			visit[info[who].r][info[who].c] = true;

			// 움직인 기사를 구하기 위한 과정
			// 좌표을 기준으로 같은 병사면 사방으로, 다른 병사면 주어진 방향으로 뻗는다
			loop: while (!queue.isEmpty()) {
				Pos p = queue.poll();
				int x = p.x;
				int y = p.y;

				for (int d = 0; d < 4; d++) {
					int nx = x + dx[d];
					int ny = y + dy[d];

					if (nx < 0 || nx >= L || ny < 0 || ny >= L) { // 경로 이탈
						if (d == where) { // 무조건 이 방향으로 가야하면
							flag = false;
							break loop;
						}
						continue;
					}
					if (trap[nx][ny] == 2 && d == where) { // 무조건 이 방향으로 가야하는데 벽이라면
						flag = false;
						break loop;
					}
					if (visit[nx][ny]) { // 이미 방문한 좌표
						continue;
					}
					if (knight[nx][ny] == 0) { // 기사가 없음
						continue;
					}
					if (knight[x][y] != knight[nx][ny] && d != where) { // 무조건 가야하는 방향이 아닌 이상 다른 기사는 영향이 없음
						continue;
					}

					visit[nx][ny] = true;
					queue.offer(new Pos(nx, ny));
					move[knight[nx][ny]] = true;

				}
			}

			if (!flag) { // 이동 불가
				continue;
			}

			knight = new int[L][L];
			for (int j = 1; j < N + 1; j++) {
				// 병사들을 이동시키기 위해 Info의 r,c를 변경 시키고
				if (move[j]) {
					info[j].r += dx[where];
					info[j].c += dy[where];

					// 밀쳐진 기사의 경우 생명 감소
					if (j != who) {
						for (int x = info[j].r; x < info[j].r + info[j].h; x++) {
							for (int y = info[j].c; y < info[j].c + info[j].w; y++) {
								if (trap[x][y] == 1) {
									info[j].k--;
								}
							}
						}
					}
				}
				if (info[j].k <= 0) {
					continue;
				}
				// 남은 기사에 대한 위치 재구축
				for (int x = info[j].r; x < info[j].r + info[j].h; x++) {
					for (int y = info[j].c; y < info[j].c + info[j].w; y++) {
						knight[x][y] = j;
					}
				}
			}
		}
		// 생존한 병사의 받은 데미지 계산
		int answer = 0;
		for (int i = 1; i < N + 1; i++) {
			answer += info[i].k > 0 ? info[i].k_save - info[i].k : 0;
		}
		System.out.println(answer);
	}

	public static void printMap(int[][] map) {
		int size = map.length;
		System.out.println("---------------------------");
		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				System.out.print(map[i][j] + " ");
			}
			System.out.println();
		}
	}
}
~~~

터무니 없는 테스트케이스에서 막히면 문제를 다시 한번 잘 읽어보자  
