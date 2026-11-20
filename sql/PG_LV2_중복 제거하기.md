https://school.programmers.co.kr/learn/courses/30/lessons/59408

유형: SUM, MAX, MIN

# 핵심 아이디어

- 이름의 종류 수를 세야 하므로 `COUNT(NAME)`이 아니라 `COUNT(DISTINCT NAME)`으로 중복을 없앤 뒤 센다.
- 이름 없는 동물은 `WHERE NAME IS NOT NULL`로 먼저 뺀다.

# Pass 1 - MySQL

```sql
-- 같은 이름은 한 번만 세도록 DISTINCT로 중복을 없앤 뒤 COUNT
SELECT COUNT(DISTINCT NAME) AS count
FROM ANIMAL_INS
-- 이름 없는 동물은 세지 않는다
WHERE NAME IS NOT NULL
```

# 막혔던 점 / 배운 점

-
