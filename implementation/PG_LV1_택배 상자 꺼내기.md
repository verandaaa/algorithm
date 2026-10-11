https://school.programmers.co.kr/learn/courses/30/lessons/389478

# 핵심 아이디어

- 상자 번호 i를 층 `(i-1)/w`와 층 안 위치 `(i-1)%w`로 바꾸고, 홀수 층은 방향이 반대라 `w-1-offset`으로 열을 구한다.
- num부터 n까지 같은 열에 있는 상자 수를 세면 num 자신과 그 위에 쌓인 상자, 즉 꺼내야 할 개수가 된다.

# Pass 1 - JavaScript

```javascript
function solution(n, w, num) {
  let answer = 0;

  const col = (i) => {
    const floor = Math.floor((i - 1) / w);
    const offset = (i - 1) % w;
    return floor % 2 === 0 ? offset : w - 1 - offset;
  };

  const target = col(num);
  for (let i = num; i <= n; i++) {
    if (col(i) === target) answer++;
  }

  return answer;
}
```

# 막혔던 점 / 배운 점

- 1부터 반복문에 포함 시킬 이유가 없었다.
