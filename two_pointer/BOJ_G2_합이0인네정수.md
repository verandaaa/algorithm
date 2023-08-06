https://www.acmicpc.net/problem/7453

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		
		int[][] arr = new int[n][4];
		StringTokenizer st;
		for(int i=0; i<n; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0; j<4; j++) {
				arr[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		
		long answer=0;
		
		//a+b, c+d를 계산해서
		int[] ab = new int[n*n];
		int[] cd = new int[n*n];
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				ab[n*i+j]=arr[i][0]+ arr[j][1];
				cd[n*i+j]=arr[i][2]+ arr[j][3];
			}
		}
		
		//투포인터 사용 위한 정렬
		Arrays.sort(ab);
		Arrays.sort(cd);
		
		//ab는 앞에서부터, cd는 뒤에서부터
		int abCur = 0;
		int cdCur = n*n-1;
		
		while(abCur<n*n && cdCur >-1) {
			long abVal = ab[abCur], cdVal = cd[cdCur];
			long result = abVal+cdVal;
			
			if(result>0) { //-3 + 6 > 0
				cdCur--; //cd값 줄이기
			}else if(result<0){ //-2 + 1 < 0 
				abCur++; //ab값 늘리기
			}else { //-5 + 5 = 0
				long abCount=0, cdCount=0;
				while(abCur<n*n && abVal==ab[abCur]) { //ab개수 세기 및 중복 방지
					abCount++;
					abCur++;
				}
				while(cdCur>=0 &&cdVal==cd[cdCur]) { //cd개수 세기 및 중복 방지
					cdCount++;
					cdCur--;
				}
				answer+= abCount*cdCount; //중복값 곱하기
			}
		}
		System.out.println(answer);
	}
}
~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, input.length).map((v) => v.split(" ").map(Number));
//<------------input

let answer = 0;

let map = new Map();

//a+b의 값과 개수를 모아서
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let ab = arr[i][0] + arr[j][1];
    map.set(ab, map.get(ab) + 1 || 1);
  }
}

//-(c+d)와 같을때마다 개수 더해주기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let cd = -(arr[i][2] + arr[j][3]);
    answer += map.get(cd) || 0;
  }
}

console.log(answer);

~~~

n이 최대 4000이라 axbxcxd를 그대로 돌리면 시간초과가 난다  
따라서 axb 1600만, cxd 1600만으로 나누어서 값을 비교해야 한다  
다만 언어에 따라 통과가 되는 풀이가 있고 아닌 풀이가 있어서 헤맸다...  
투포인터를 사용 - javascript 시간초과, java 성공  
Map을 사용 - javascript 성공, java 시간초과  
