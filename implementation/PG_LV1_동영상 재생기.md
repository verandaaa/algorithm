https://school.programmers.co.kr/learn/courses/30/lessons/340213

# 핵심 아이디어

- `mm:ss` 문자열을 전부 초 단위 정수로 바꿔 두면 비교와 ±10초 이동이 단순한 산술이 된다.
- 오프닝 구간 건너뛰기는 명령 처리 **전과 후** 모두 확인해야 한다 (시작 위치가 오프닝 안일 수도 있으므로).
- 이동 결과는 `Math.min`/`Math.max`로 0초와 영상 길이 사이에 묶고, 마지막에 `padStart`로 다시 `mm:ss`로 만든다.

# Pass 1 - JavaScript

```javascript
function solution(video_len, pos, op_start, op_end, commands) {
  let answer = "";

  function changeValue(value) {
    let [minute, second] = value.split(":").map(Number);
    return minute * 60 + second;
  }

  let current = changeValue(pos);

  let v_start_number = 0;
  let v_end_number = changeValue(video_len);
  let op_start_number = changeValue(op_start);
  let op_end_number = changeValue(op_end);

  for (let c of commands) {
    if (op_start_number <= current && current <= op_end_number) {
      current = op_end_number;
    }
    if (c === "next") {
      current = Math.min(current + 10, v_end_number);
    } else if (c === "prev") {
      current = Math.max(current - 10, v_start_number);
    }
    if (op_start_number <= current && current <= op_end_number) {
      current = op_end_number;
    }
  }

  let minute = String(Math.floor(current / 60));
  let second = String(current % 60);
  answer = minute.padStart(2, "0") + ":" + second.padStart(2, "0");

  return answer;
}
```

# 막혔던 점 / 배운 점

- 오프닝 구간 여부를 연산 전/후로 확인해야 했었음
