https://www.acmicpc.net/problem/12757

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
	static TreeMap<Integer, Integer> map;
	static int k;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("./src/input.txt"));
		// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		k = Integer.parseInt(st.nextToken());

		map = new TreeMap<>();
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			int key = Integer.parseInt(st.nextToken());
			int value = Integer.parseInt(st.nextToken());
			map.put(key, value);
		}

		for (int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine());
			int option = Integer.parseInt(st.nextToken());
			int key = Integer.parseInt(st.nextToken());
			int value = st.hasMoreTokens() ? Integer.parseInt(st.nextToken()) : 0;

			// 해당 Key와 Value를 가진 데이터를 추가한다.
			if (option == 1) {
				map.put(key, value);
			}
			// 해당 Key로 검색된 데이터를 Value로 변경한다.
			else if (option == 2) {
				int[] newKey = findNearPosition(key);
				
				//조건을 만족하는 유일한 Key가 존재하는 경우만 수행한다.
				if (newKey.length == 1) {
					map.put(newKey[0], value);
				}
			}
			// 해당 Key로 검색된 데이터를 출력한다.
			else if (option == 3) {
				int[] newKey = findNearPosition(key);
				
				// 조건을 만족하는 Key가 없는 경우 -1을 출력한다.
				if (newKey.length == 0) {
					sb.append(-1).append("\n");
				}
				// key가 1개 존재할 경우 값을 출력한다.
				else if (newKey.length == 1) {
					sb.append(map.get(newKey[0])).append("\n");
				}
				// 만약 해당하는 Key가 두 개 이상 존재한다면 ?를 출력한다.
				else if (newKey.length == 2) {
					sb.append("?").append("\n");
				}

			}
		}

		System.out.println(sb.toString());
	}

	public static int[] findNearPosition(int key) {
		if (map.containsKey(key)) {
			return new int[] { key };
		}

		Integer left = map.floorKey(key);
		Integer right = map.ceilingKey(key);

		// 차이가 k를 넘는 경우
		if (right != null && Math.abs(right - key) > k) {
			right = null;
		}
		if (left != null && Math.abs(left - key) > k) {
			left = null;
		}

		// 둘 다 불가능
		if (left == null && right == null) {
			return new int[] {};
		}
		// left만 가능
		if (right == null) {
			return new int[] { left };
		}
		// right만 가능
		if (left == null) {
			return new int[] { right };
		}

		// 두개를 비교하여 선택하기
		if (Math.abs(left - key) < Math.abs(right - key)) {
			return new int[] { left };
		} //
		else if (Math.abs(left - key) > Math.abs(right - key)) {
			return new int[] { right };
		} //
		else {
			return new int[] { left, right };
		}
	}

}

~~~
