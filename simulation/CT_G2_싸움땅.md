# Solution 1 - JAVA
~~~java
package algo;

import java.io.*;
import java.util.*;

public class Main {
	static class Person {
		int x, y, d, s, g;

		public Person(int x, int y, int d, int s, int g) {
			super();
			this.x = x;
			this.y = y;
			this.d = d;
			this.s = s;
			this.g = g;
		}

		@Override
		public String toString() {
			return "Person [x=" + x + ", y=" + y + ", d=" + d + ", s=" + s + ", g=" + g + "]";
		}
		
	}
	static int n;
	static int m;
	static int k;
	static List<Integer>[][] gunMap;
	static int[][] personMap;
	static Person[] persons;
	static int[] dx = { -1, 0, 1, 0 }; // 상우하좌
	static int[] dy = { 0, 1, 0, -1 };
	static int[] answer;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());
		k = Integer.parseInt(st.nextToken());
		gunMap = new ArrayList[n][n];
		personMap = new int[n][n];
		persons = new Person[m+1];
		answer = new int[m+1];
		
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < n; j++) {
				gunMap[i][j] = new ArrayList<Integer>();
				int x = Integer.parseInt(st.nextToken());
				if (x == 0)
					continue;
				gunMap[i][j].add(x); // 총 위치
			}
		}
		for (int i = 1; i < m+1; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int x = Integer.parseInt(st.nextToken()) - 1;
			int y = Integer.parseInt(st.nextToken()) - 1;
			int d = Integer.parseInt(st.nextToken());
			int s = Integer.parseInt(st.nextToken());
			int g = 0;
			persons[i] = new Person(x, y, d, s, g);
			personMap[x][y] = i; // 사람 위치
		}
		// input 끝

		for (int r = 0; r < k; r++) { // 총 k라운드
			for (int personIndex = 1; personIndex < m+1; personIndex++) { // 사람수
				Person p = persons[personIndex];
				int nx = p.x + dx[p.d];
				int ny = p.y + dy[p.d];
				int nd = p.d;

				if (nx < 0 || nx >= n || ny < 0 || ny >= n) { // 맵에서 벗어나면
					nx = p.x + dx[(p.d + 2) % 4]; // 반대 방향으로 전환
					ny = p.y + dy[(p.d + 2) % 4];
					nd = (p.d + 2) % 4;
				} //이동위치, 방향 모두 선태 완료
				
				personMap[p.x][p.y] = 0; //원래 자리 비워줌
				
				p.x = nx;
				p.y = ny;
				p.d = nd;
				persons[personIndex] = p;

				if (personMap[nx][ny] != 0) { // 사람 존재
					//싸운다
					Person p1 = persons[personMap[nx][ny]];
					Person p2 = persons[personIndex];

					int result = battle(p1,p2);
					int win = result==1?personMap[nx][ny]:personIndex;
					int lose = result==1?personIndex:personMap[nx][ny];	
					
					int point = Math.abs(p1.s+p1.g-p2.s-p2.g);
					answer[win] += point;
					
					Person winPerson = persons[win];
					Person losePerson = persons[lose];
					
					//진 사람
					if (losePerson.g != 0) {
						gunMap[nx][ny].add(losePerson.g);
						losePerson.g = 0;
					}
					for(int dir = 0;dir < 4; dir++) {
						int nnd = (losePerson.d+dir)%4;
						int nnx = losePerson.x+dx[nnd];
						int nny = losePerson.y+dy[nnd];
						
						if (nnx < 0 || nnx >= n || nny < 0 || nny >= n)
							continue;
						if(personMap[nnx][nny]!=0)
							continue;
						
						int nns = losePerson.s;
						int nng = selectGun(losePerson.g, nnx, nny);	
						persons[lose] = new Person(nnx, nny, nnd, nns, nng);
						personMap[nnx][nny] = lose;
						break;
					}
					
					//이긴 사람
					winPerson.g = selectGun(winPerson.g, nx, ny);
					persons[win] = winPerson;
					personMap[nx][ny] = win;
					
					
				} else { // 사람 없음
					p.g = selectGun(p.g, nx, ny); //총 고르고
					persons[personIndex] = p;
					personMap[nx][ny] = personIndex;
				}

			}
		}
		for(int i=1;i<m+1;i++) {
			System.out.printf("%d ",answer[i]);
		}
	}
	public static int battle(Person p1, Person p2) {
		if (p1.s + p1.g > p2.s + p2.g) {
			return 1;
		}
		else if (p1.s + p1.g == p2.s + p2.g) {
			if(p1.s>p2.s) {
				return 1;
			}
			else {
				return 2;
			}
		}
		else{
			return 2;
		}
	}
	public static int selectGun(int ng, int nx, int ny) {
		if (ng != 0) {
			gunMap[nx][ny].add(ng);
		}
		int max = 0;
		int maxIndex = -1;
		for (int i = 0; i < gunMap[nx][ny].size(); i++) {
			if (max < gunMap[nx][ny].get(i)) {
				max = gunMap[nx][ny].get(i);
				maxIndex = i;
			}
		}
		if (maxIndex >= 0) {
			ng = max;
			gunMap[nx][ny].remove(maxIndex);
		}
		return ng;
	}
	

}

~~~
