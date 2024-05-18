https://www.acmicpc.net/problem/21942

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ");
let arr = input.slice(1, 1 + n).map((v) => v.split(" "));
//<------------input
let answer = new Map();

let day = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let days = [0];
for (let i = 1; i <= 12; i++) {
  days[i] = days[i - 1] + day[i - 1];
}
let minutes = [24 * 60, 60, 1]; //일, 시간, 분

m = m.split(/[/:]/).map(Number);
m = m[0] * minutes[0] + m[1] * minutes[1] + m[2] * minutes[2];

let map = new Map();
for (let line of arr) {
  let [time1, time2, name1, name2] = line;
  time1 = time1.split(/[-]/).map(Number);
  time2 = time2.split(/[:]/).map(Number);
  let time = days[time1[1]] * minutes[0] + (time1[2] - 1) * minutes[0] + time2[0] * minutes[1] + time2[1] * minutes[2];
  let name = name1 + " " + name2;

  if (map.has(name)) {
    let over = time - map.get(name) - m;
    if (over > 0) {
      answer.set(name2, answer.get(name2) + over * k || over * k);
    }
    map.delete(name);
  } else {
    map.set(name, time);
  }
}

if (answer.size) {
  answer = Array.from(answer);
  answer.sort((a, b) => a[0].localeCompare(b[0]));
  answer = answer.map((v) => v.join(" ")).join("\n");
} else {
  answer = -1;
}

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ");
let arr = input.slice(1, 1 + n).map((v) => v.split(" "));
//<------------input
let answer = new Map();

m = m.split(/[/:]/).map(Number);
m = (m[0] * 24 * 60 + m[1] * 60 + m[2]) * 60 * 1000;

let map = new Map();
for (let line of arr) {
  let [time1, time2, name1, name2] = line;
  let time = new Date(time1 + " " + time2);
  let name = name1 + " " + name2;

  if (map.has(name)) {
    let over = (time - map.get(name) - m) / (60 * 1000);
    if (over > 0) {
      answer.set(name2, answer.get(name2) + over * k || over * k);
    }
    map.delete(name);
  } else {
    map.set(name, time);
  }
}

answer = answer.size
  ? [...answer]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((v) => v.join(" "))
      .join("\n")
  : -1;

console.log(answer);

~~~

부품이름과 사람이름에는 공백이 없으므로 map의 key는 두 이름을 공백으로 합한 것으로 정한다  
시간의 경우 일일이 날짜를 계산해서 구할 수도 있지만 js의 Date를 사용하면 쉽게 구할 수 있었다  
다만 구한 시간이 ms기준이므로 60*1000을 고려하여 분 단위로 바꾸도록 한다  
