https://school.programmers.co.kr/learn/courses/30/lessons/59039

유형: IS NULL

# 핵심 아이디어

- NULL은 값이 없다는 표시라서 `NAME = NULL`로는 비교되지 않는다. `WHERE NAME IS NULL`로 이름이 비어 있는 행만 골라낸다.

# Pass 1 - MySQL

```sql
-- NULL은 = 로 비교되지 않으므로 IS NULL로 이름 없는 동물만 거른다
SELECT ANIMAL_ID FROM ANIMAL_INS WHERE NAME IS NULL
```

# 막혔던 점 / 배운 점

-
