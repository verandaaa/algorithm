https://www.acmicpc.net/problem/18258

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

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
    if (!this.head) return -1;
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return data;
  }

  empty() {
    return this.size === 0 ? 1 : 0;
  }

  getSize() {
    return this.size;
  }

  front() {
    if (!this.head) return -1;
    return this.head.data;
  }

  back() {
    if (!this.tail) return -1;
    return this.tail.data;
  }
}

const queue = new Queue();

for (let x of arr) {
  let [opt, num] = x.split(" ");
  switch (opt) {
    case "push":
      queue.push(num);
      break;
    case "pop":
      answer += queue.pop() + "\n";
      break;
    case "size":
      answer += queue.getSize() + "\n";
      break;
    case "empty":
      answer += queue.empty() + "\n";
      break;
    case "front":
      answer += queue.front() + "\n";
      break;
    case "back":
      answer += queue.back() + "\n";
      break;
  }
}

console.log(answer);

~~~
