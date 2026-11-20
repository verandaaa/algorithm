https://school.programmers.co.kr/learn/courses/30/lessons/132203

유형: SELECT

# 핵심 아이디어

- 진료과가 둘 중 하나인지는 `OR`를 두 번 쓰는 대신 `IN ('CS', 'GS')`로 한 번에 거른다.
- 정렬 기준이 둘이라 `ORDER BY`에 우선순위대로 나열한다. 고용일자가 같을 때만 이름순이 적용된다.

# Pass 1 - MySQL

```sql
SELECT DR_NAME, DR_ID, MCDP_CD, HIRE_YMD
FROM DOCTOR
-- 흉부외과(CS)나 일반외과(GS)만 남긴다
WHERE MCDP_CD IN ('CS', 'GS')
-- 고용일자 최신순, 같으면 이름순
ORDER BY HIRE_YMD DESC, DR_NAME ASC
```

# 막혔던 점 / 배운 점

-
