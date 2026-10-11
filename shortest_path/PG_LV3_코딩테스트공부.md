https://school.programmers.co.kr/learn/courses/30/lessons/118668

# Solution 1 - JavaScript
~~~javascript
function solution(alp, cop, problems) {
	class Power {
		constructor(alp, cop, time) {
			this.alp = alp;
			this.cop = cop;
			this.time = time;
		}
	}
	let answer = 0;
	let alp_max = 0, cop_max = 0;
	let map = Array.from(Array(151), () => Array(151).fill(Infinity));

	for (let i = 0; i < problems.length; i++) { //목표 설정
		alp_max = Math.max(problems[i][0], alp_max);
		cop_max = Math.max(problems[i][1], cop_max);
	}
	problems.push([0, 0, 0, 1, 1]); //꽁짜 공부
	problems.push([0, 0, 1, 0, 1]);

	let queue = [new Power(alp, cop, 0)]; //현재 부터 시작
	while (queue.length > 0) {
            let newQueue = [];
            
            for(let p of queue){ 
                for (let i = 0; i < problems.length; i++) {
                    if (p.alp >= problems[i][0] && p.cop >= problems[i][1]) { //풀 수 있는 문제만
                        let nalp = p.alp + problems[i][2]; //알고력 추가
                        let ncop = p.cop + problems[i][3]; //코딩력 추가
                        let ntime = p.time + problems[i][4]; //시간 추가
    
                        if (nalp >= alp_max) { //최대 목표치를 넘어갈 수 없다
                            nalp = alp_max;
                        }
                        if (ncop >= cop_max) { //최대 목표치를 넘어갈 수 없다
                            ncop = cop_max;
                        }
                        if (ntime < map[nalp][ncop]) { //특정 알고력, 코딩력을 달성하는데 드는 시간이 더 작은 경우를 발견시
                            map[nalp][ncop] = ntime; //갱신
                            newQueue.push(new Power(nalp, ncop, ntime));
                        }
                    }
                }   
            }           
            queue = newQueue;
	}
  
	answer = map[alp_max][cop_max];

	return answer;
}
~~~
  
problems 배열의 최대 길이가 100이기 때문에 queue의 길이가 엄청 길어질 수 도 있다.  
이런 경우 shift를 쓰면 속도가 오래 걸리기 때문에 newQueue를 활용하는 방식을 사용하자.  
