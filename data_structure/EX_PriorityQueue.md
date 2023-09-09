# 원소가 정수 - JavaScript
https://school.programmers.co.kr/learn/courses/15009/lessons/121688
~~~javascript
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
~~~

# 원소가 배열 - JavaScript
https://school.programmers.co.kr/learn/courses/15008/lessons/121686
~~~javascript
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

    bubbleUp() {
      let index = this.queue.length - 1;

      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (
          this.queue[parentIndex][0] < this.queue[index][0] ||
          (this.queue[parentIndex][0] === this.queue[index][0] &&
            this.queue[parentIndex][1] < this.queue[index][1])
        ) {
          break;
        }

        [this.queue[parentIndex], this.queue[index]] = [
          this.queue[index],
          this.queue[parentIndex],
        ];
        index = parentIndex;
      }
    }

    sinkDown() {
      let index = 0;
      const length = this.queue.length;

      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let target = index;

        if (
          leftChildIndex < length &&
          (this.queue[leftChildIndex][0] < this.queue[target][0] ||
            (this.queue[leftChildIndex][0] === this.queue[target][0] &&
              this.queue[leftChildIndex][1] < this.queue[target][1]))
        ) {
          target = leftChildIndex;
        }

        if (
          rightChildIndex < length &&
          (this.queue[rightChildIndex][0] < this.queue[target][0] ||
            (this.queue[rightChildIndex][0] === this.queue[target][0] &&
              this.queue[rightChildIndex][1] < this.queue[target][1]))
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
~~~
