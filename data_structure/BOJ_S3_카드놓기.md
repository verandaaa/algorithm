https://www.acmicpc.net/problem/18115

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0; i<n; i++){
            arr[i] = Integer.parseInt(st.nextToken());
        }

        Deque<Integer> deque = new ArrayDeque<>();
        for (int i = 1; i <= n; i++) {
            int x = arr[n - i];
            if (x == 1) {
                deque.addFirst(i);
            } 
            else if (x == 2) {
                int first = deque.pollFirst(); 
                deque.addFirst(i);
                deque.addFirst(first);
            } 
            else if (x == 3) {
                deque.addLast(i);
            }
        }
        
        StringBuilder answer = new StringBuilder();
        for (int num : deque) {
            answer.append(num).append(" ");
        }
        
        System.out.println(answer.toString());
    }
}
~~~
카드 1 2 3 4 5 를 가진 상태로 거꾸로 돌아오며 초기 카드를 찾는 방법  
js로는 시간초과 발생

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = new Array(n).fill(0);

let [p1, p2, p3] = [0, 1, n - 1];

for (let x of arr) {
  if (x === 1) {
    answer[p1] = n;
    p1 = p2;
    p2++;
  } //
  else if (x === 2) {
    answer[p2] = n;
    p2++;
  } //
  else if (x === 3) {
    answer[p3] = n;
    p3--;
  }
  n--;
}

answer = answer.join(" ");

console.log(answer);
~~~

5 4 3 2 1 상태로 쌓일 것을 기대하며 초기 카드 상태를 가정하며 진행
