https://www.acmicpc.net/problem/1325

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + m).map((v) => v.split(" ").map((v) => v * 1 - 1));
//<------------input
let answer = "";

let edges = Array.from(Array(n), () => []);
for (let [from, to] of map) {
  edges[to].push(from);
}

let counts = Array.from(Array(n), () => 0);
for (let i = 0; i < n; i++) {
  let queue = [i];
  let visit = Array.from(Array(n), () => false);
  visit[i] = true;
  let count = 0;
  while (queue.length) {
    let from = queue.shift();

    for (let to of edges[from]) {
      if (visit[to]) {
        continue;
      }
      count++;
      visit[to] = true;
      queue.push(to);
    }
  }
  counts[i] = count;
}
let max = Math.max(...counts);

for (let i = 0; i < n; i++) {
  if (counts[i] === max) {
    answer += i + 1 + " ";
  }
}

console.log(answer);
~~~

이 코드를 그대로 java로 옮겨서 넣어봤다. 시간초과가 발생하였다.  

# Pass 2 - Java
~~~javascript
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine()," ");
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		
		ArrayList<Integer>[] edges = new ArrayList[n];
		for(int i=0;i<n;i++) {
			edges[i] = new ArrayList<Integer>();
		}
		for(int i=0; i<m; i++) {
			st = new StringTokenizer(br.readLine()," ");
			int from = Integer.parseInt(st.nextToken())-1;
			int to = Integer.parseInt(st.nextToken())-1;
			edges[from].add(to);
		}
		
		int[] counts = new int[n];
		for(int i=0;i<n;i++) {
			Queue<Integer> queue = new LinkedList<Integer>();
			queue.add(i);
			boolean[] visit = new boolean[n];
			visit[i]=true;
			while(!queue.isEmpty()) {
				int from = queue.poll();
				
				for(int j=0;j<edges[from].size();j++) {
					int to = edges[from].get(j);
					if(visit[to]) {
						continue;
					}
					counts[to]++;
					visit[to] = true;
					queue.add(to);
				}
			}
		}
		int max = 0;
		for(int i=0;i<n;i++) {
			max = Math.max(max, counts[i]);
		}
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<n; i++) {
			if(counts[i] == max) sb.append(i+1).append(" ");
		}
		
		System.out.println(sb);
	}
}
~~~
java 시간초과한 버전에서 from과 to를 바꾸고, count세는 것만 바꾼 것이다  
두 코드 모두 모든 edge를 탐색하도록 되어있는데, from to만 바꾼다고 통과/시간초과가 갈리는게 이해가 가지 않았다  
예를들어서 1->2,3,4,5..... 와 같은 형태와 2,3,4,5....->1 과 같은 형태 두가지가 있다고 했을때  
첫번째의 경우 queue에 한번에 많은 양을 넣게 된다. 아마도 queue의 size가 크면 클수록 poll하는데에 시간이 더 걸리기 때문이지 않을까?
