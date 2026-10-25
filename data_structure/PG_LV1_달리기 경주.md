https://school.programmers.co.kr/learn/courses/30/lessons/178871

# 핵심 아이디어

- 이름 → 선수 번호를 Map에 저장해 불린 선수를 O(1)로 찾는다.
- 선수마다 앞(front)·뒤(back)를 가리키는 이중 연결 리스트로 두고, 추월할 때 앞 선수와 링크만 바꿔서 배열을 밀지 않고 O(1)에 순서를 바꾼다.
- 맨 앞 선수(first)를 따로 기록해 두었다가 마지막에 back을 따라가며 순서를 만든다.

![img](../0_image/PG_LV1_달리기%20경주_1.svg)

# Pass 1 - JavaScript

```javascript
function solution(players, callings) {
  var answer = [];

  let map = new Map();
  let infos = [];

  // 이름 → 번호를 Map에 저장하고, 선수마다 앞·뒤 선수 번호를 연결 리스트로 둔다
  for (let i = 0; i < players.length; i++) {
    map.set(players[i], i);
    infos.push({
      number: i,
      name: players[i],
      front: i - 1 >= 0 ? i - 1 : null,
      back: i + 1 < players.length ? i + 1 : null,
    });
  }

  let first = 0;
  for (let call of callings) {
    // 불린 선수(b)를 O(1)로 찾고, 바로 앞 선수(a)와 그 앞뒤(aa, bb)를 구한다
    let index = map.get(call);
    let a = infos[index].front;
    let b = infos[index].number;

    let aa = infos[a].front;
    let bb = infos[b].back;
    // 배열을 밀지 않고 aa-b-a-bb 순서가 되도록 링크만 바꾼다
    if (aa !== null) {
      infos[aa].back = b;
    }
    if (bb !== null) {
      infos[bb].front = a;
    }
    infos[a].front = b;
    infos[a].back = bb;
    infos[b].front = aa;
    infos[b].back = a;

    // 맨 앞 선수를 추월했으면 b가 새 1등
    if (aa === null) {
      first = b;
    }
  }

  // 1등부터 back을 따라가며 최종 순서를 만든다
  let current = first;
  while (answer.length < players.length) {
    answer.push(infos[current].name);
    current = infos[current].back;
  }

  return answer;
}
```

# 막혔던 점 / 배운 점

-
