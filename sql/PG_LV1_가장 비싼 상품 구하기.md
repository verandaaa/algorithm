https://school.programmers.co.kr/learn/courses/30/lessons/131697

유형: SUM, MAX, MIN

# 핵심 아이디어

- 정렬해서 첫 행을 고를 필요 없이 집계 함수 `MAX(PRICE)`로 테이블 전체에서 가장 큰 가격 하나를 바로 구하고, `AS MAX_PRICE`로 원하는 컬럼 이름을 붙인다.

# Pass 1 - MySQL

```sql
-- 전체 행을 MAX로 집계해 가장 높은 가격 한 값만 남긴다
SELECT MAX(PRICE) AS MAX_PRICE FROM PRODUCT
```

# 막혔던 점 / 배운 점

-
