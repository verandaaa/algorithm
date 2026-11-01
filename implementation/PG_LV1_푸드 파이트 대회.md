https://school.programmers.co.kr/learn/courses/30/lessons/134240

# 핵심 아이디어

- 두 선수가 같은 양을 먹어야 하므로 음식마다 `Math.floor(food[i] / 2)`개만 한쪽(`front`)에 칼로리 순으로 놓는다.
- 반대쪽은 `front`를 뒤집은 것이고, 가운데에 물 `0`을 두면 답이 된다.

![img](../0_image/PG_LV1_푸드%20파이트%20대회_1.svg)

# Pass 1 - JavaScript

```javascript
function solution(food) {
  var answer = "";

  // 물(0번)은 빼고, 음식마다 절반씩만 한쪽에 칼로리 순으로 놓는다
  let front = "";
  for (let i = 1; i < food.length; i++) {
    let count = Math.floor(food[i] / 2);
    let str = String(i).repeat(count);
    front += str;
  }
  // 반대쪽 선수는 같은 배치를 거꾸로 먹는다
  let back = [...front].reverse().join("");

  answer = front + "0" + back;

  return answer;
}
```

# 막혔던 점 / 배운 점

-
