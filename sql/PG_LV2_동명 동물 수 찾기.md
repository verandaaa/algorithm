https://school.programmers.co.kr/learn/courses/30/lessons/59041

유형: GROUP BY

# 핵심 아이디어

- 이름 없는 동물은 묶기 전에 `WHERE NAME IS NOT NULL`로 빼고, `GROUP BY NAME`으로 같은 이름끼리 묶어 `COUNT(*)`로 센다.
- "두 번 이상"은 묶은 뒤의 개수로 거르는 조건이라 `WHERE`가 아니라 `HAVING COUNT(*) >= 2`에 둔다.

![img](../0_image/PG_LV2_동명%20동물%20수%20찾기_1.svg)

# Pass 1 - MySQL

```sql
SELECT NAME, COUNT(*) AS COUNT
FROM ANIMAL_INS
-- 이름 없는 동물은 묶기 전에 뺀다
WHERE NAME IS NOT NULL
-- 같은 이름끼리 묶어 COUNT(*)로 센다
GROUP BY NAME
-- 묶은 뒤의 개수로 거르므로 WHERE가 아니라 HAVING
HAVING COUNT(*) >= 2
ORDER BY NAME
```

# 막혔던 점 / 배운 점

-
