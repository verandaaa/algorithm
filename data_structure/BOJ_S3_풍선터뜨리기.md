https://www.acmicpc.net/problem/2346

# Pass 1 - Java
~~~java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        String[] input = br.readLine().split(" ");

        Deque<int[]> queue = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            queue.add(new int[]{Integer.parseInt(input[i]), i});
        }

        StringBuilder answer = new StringBuilder();

        for (int k = 0; k < n - 1; k++) {
            int[] current = queue.pollFirst();
            int s = current[0];
            int idx = current[1];

            answer.append(idx + 1).append(" ");

            if (s > 0) {
                for (int j = 0; j < s - 1; j++) {
                    queue.addLast(queue.pollFirst());
                }
            } else {
                for (int j = 0; j < -s; j++) {
                    queue.addFirst(queue.pollLast());
                }
            }
        }

        int[] last = queue.pollFirst();
        answer.append(last[1] + 1);

        System.out.println(answer.toString());
    }
}
~~~

# Fail 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let n = input[0];
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = "";

let queue = arr.map((s, i) => [s, i]);
for (let i = 0; i < n; i++) {
  let [s, i] = queue.shift();
  answer += i + 1 + " ";
  if (s > 0) {
    let count = Math.abs(s);
    for (let j = 0; j < count - 1; j++) {
      queue.push(queue.shift());
    }
  } else if (s < 0) {
    let count = Math.abs(s);
    for (let j = 0; j < count; j++) {
      queue.unshift(queue.pop());
    }
  }
}

console.log(answer);

~~~

메모리 초과로 node.js 정답 사례를 찾을 수 없어 java 로 대체함
