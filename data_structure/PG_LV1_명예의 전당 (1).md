https://school.programmers.co.kr/learn/courses/30/lessons/138477

# 핵심 아이디어

- 매일 필요한 답은 "상위 k개 점수 중 최솟값"이다. 상위 k개만 담은 최소 힙(pqueue)을 두면 루트(peek)가 곧 명예의 전당 최하위 점수다.
- 점수를 넣은 뒤 크기가 k를 넘으면 루트(가장 작은 값)를 빼서 항상 상위 k개만 남긴다. 매일 정렬하지 않고 O(log k)로 갱신한다.

![img](../0_image/PG_LV1_명예의%20전당%20(1)_1.svg)

# Pass 1 - JavaScript

```javascript
// 최소 힙: 루트(queue[0])가 항상 가장 작은 값이다
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    this.bubbleUp();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const target = this.queue[0];
    const last = this.queue.pop();

    if (!this.isEmpty()) {
      this.queue[0] = last;
      this.sinkDown();
    }

    return target;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }

  peek() {
    return this.isEmpty() ? null : this.queue[0];
  }

  // 끝에 넣은 값을 부모보다 작은 동안 위로 올린다
  bubbleUp() {
    let index = this.queue.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.queue[parentIndex] < this.queue[index]) {
        break;
      }

      [this.queue[parentIndex], this.queue[index]] = [
        this.queue[index],
        this.queue[parentIndex],
      ];
      index = parentIndex;
    }
  }

  // 루트로 올린 값을 더 작은 자식과 바꾸며 아래로 내린다
  sinkDown() {
    let index = 0;
    const length = this.queue.length;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let target = index;

      if (
        leftChildIndex < length &&
        this.queue[leftChildIndex] < this.queue[target]
      ) {
        target = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.queue[rightChildIndex] < this.queue[target]
      ) {
        target = rightChildIndex;
      }

      if (target === index) {
        break;
      }

      [this.queue[index], this.queue[target]] = [
        this.queue[target],
        this.queue[index],
      ];
      index = target;
    }
  }
}

function solution(k, score) {
  let answer = [];

  // 상위 k개 점수만 최소 힙에 유지하면 루트가 k등(최하위) 점수가 된다
  const pqueue = new PriorityQueue();
  for (let todayScore of score) {
    // 명예의 전당이 안 찼으면 그냥 넣고, 찼으면 넣은 뒤 가장 작은 점수를 빼서 k개만 남긴다
    if (pqueue.size() < k) {
      pqueue.enqueue(todayScore);
    } else {
      pqueue.enqueue(todayScore);
      pqueue.dequeue();
    }
    // 힙의 루트가 오늘의 명예의 전당 최하위 점수
    answer.push(pqueue.peek());
  }

  return answer;
}
```

# 막혔던 점 / 배운 점

-
