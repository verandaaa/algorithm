https://www.acmicpc.net/problem/16434

# Pass 1 - Java
~~~javascript
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		long answer = 0;
		int n = Integer.parseInt(st.nextToken());
		long m = Integer.parseInt(st.nextToken());
		ArrayList<Long> list = new ArrayList<Long>();
		list.add((long) 0); //0 넣는 이유 : +를 못만난 상태로 배열이 끝나는 경우 때문에
		for (int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			int t = Integer.parseInt(st.nextToken());
			int a = Integer.parseInt(st.nextToken());
			int h = Integer.parseInt(st.nextToken());
			if (t == 1) {
				// 몬스터의 공격
				list.add((long) (-1 * a * (Math.ceil((double) h / m) - 1))); //h/m하면 둘다 정수라서 정수값 나오기 때문에 double 붙여줘야 함
			} else {
				// 회복 물약
				list.add((long) h);
				m += a;
			}
		}
		// list -> [0, -6, +10, -48]

		long cur = 1;

		for (int i = list.size() - 1; i >= 0; i--) {
			// 역순
			if (list.get(i) < 0) {
				// -면 그만큼 생명력 필요
				cur += -1 * list.get(i);
			} else {
				answer = Math.max(answer, cur); // 일단 최대값 저장
				if (list.get(i) >= cur) {
					// 넘친다
					cur = 1;
				} else {
					// 넘치지않음
					cur += -1 * list.get(i);
				}
			}
		}
		System.out.println(answer);
	}
}
~~~

자바스크립트에서 자료형 문제 때문에 자바로 옮김  
자바스크립트는 number가 최대 2^53-1이기 때문에 문제에서 123456x1000000x1000000이 범위를 넘어가기 때문에 문제가 생긴다  
그래서 BigInt를 사용해 모든 변수에 적용했으나 RuntimeError(TypeError)가 떠서 포기  
자바로 변수형만 long으로 설정하였더니 통과됨  
자바에서 주의할 점은 int 나누기 int를 하면 int가 나와서 ceil이 적용이 되지 않기 때문에 double을 붙여줘야 한다  
