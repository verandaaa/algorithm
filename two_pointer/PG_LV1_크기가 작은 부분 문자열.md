https://school.programmers.co.kr/learn/courses/30/lessons/147355

# 핵심 아이디어

- 길이가 `p.length`로 고정된 슬라이딩 윈도우다. 오른쪽 글자를 붙이고 맨 앞 글자를 버리면서 창을 한 칸씩 밀어, 길이가 같은 부분 문자열을 앞에서부터 하나씩 확인한다.
- 문자열을 `Number`로 바꿔 비교하므로 `"02"`처럼 0으로 시작하는 부분 문자열도 2로 계산된다.

![img](../0_image/PG_LV1_크기가%20작은%20부분%20문자열_1.svg)

# Pass 1 - JavaScript

```javascript
function solution(t, p) {
  let answer = 0;

  // 부분 문자열의 길이는 p와 같고, 비교는 숫자로 한다
  let len = p.length;
  let pNum = Number(p);

  // 반복문에서 한 글자를 먼저 붙이므로 창을 len - 1글자로 시작한다
  let current = t.substring(0, len - 1);
  // 오른쪽 글자를 붙여 len글자를 만들어 비교하고, 맨 앞 글자를 버려 창을 민다
  for (let i = len - 1; i < t.length; i++) {
    current += t[i];
    if (Number(current) <= pNum) {
      answer++;
    }
    current = current.substring(1, len);
  }

  return answer;
}
```

# 막혔던 점 / 배운 점

-
