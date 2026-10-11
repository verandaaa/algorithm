https://school.programmers.co.kr/learn/courses/30/lessons/214288

# Pass 1 - JavaScript
~~~javascript
function solution(k, n, reqs) {
  let answer = [];

  let mento = Array.from(Array(k), () => 1);

  dfs(k, n, reqs, mento, 0, k, answer);

  answer = Math.min(...answer);

  return answer;
}

function dfs(k, n, reqs, mento, end, sum, answer) {
  if (end === k) {
    //k종류의 상담
    if (sum === n) {
      //인원수를 합쳤더니 n이면
      let sum = start(k, mento.slice(0, k), reqs); //각 종류별 상담사를 데리고 상담 시작
      answer.push(sum);
    }
    return;
  }
  for (let i = 0; i <= n - sum; i++) {
    mento[end] += i;
    dfs(k, n, reqs, mento, end + 1, sum + i, answer);
    mento[end] -= i;
  }
}

function start(k, mento, reqs) {
  let queue = Array.from(Array(k), () => []);
  let sum = 0;

  for (let [come, work, num] of reqs) {
    //상담 끝난 사람은 나가
    while (queue[num - 1].length && queue[num - 1][0] <= come) {
      queue[num - 1].shift();
    }

    if (queue[num - 1].length === mento[num - 1]) {
      //상담 풀방 대기 필요
      let min = queue[num - 1].shift();
      let wait = min - come;
      sum += wait;
      queue[num - 1].push(come + work + wait);
    } else {
      //상담 바로 고
      queue[num - 1].push(come + work);
    }
    queue[num - 1].sort((a, b) => a - b); //가장 빨리 끝나는 상담 시간
  }
  return sum;
}

~~~

헤맸던 부분 : k개의 정수로 합이 n인 배열을 구하기  
불필요한 연산 없이 딱 끝내고 싶은데.... 합이 n이하인 순열을 먼저 구하고 그 중에서 합이 n인 경우를 찾았다.  
