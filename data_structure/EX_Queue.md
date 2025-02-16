# 배열 - JavaScript
~~~javascript
class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const queue = new Queue();

~~~


# 연결리스트 - JavaScript
~~~javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  pop() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return data;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }

  getSize() {
    return this.size;
  }

  front() {
    if (!this.head) return null;
    return this.head.data;
  }

  rear() {
    if (!this.tail) return null;
    return this.tail.data;
  }
}

const queue = new Queue();
~~~
