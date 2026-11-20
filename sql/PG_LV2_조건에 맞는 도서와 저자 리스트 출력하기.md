https://school.programmers.co.kr/learn/courses/30/lessons/144854

유형: JOIN

# 핵심 아이디어

- 저자 이름은 `AUTHOR` 테이블에만 있으므로 `BOOK`의 `AUTHOR_ID`를 키로 두 테이블을 이어 붙인다.
- 이어 붙인 뒤 `WHERE`로 경제 카테고리만 남기고 출판일 순으로 정렬한다.

![img](../0_image/PG_LV2_조건에%20맞는%20도서와%20저자%20리스트%20출력하기_1.svg)

# Pass 1 - MySQL

```sql
SELECT BOOK_ID, AUTHOR_NAME, PUBLISHED_DATE
FROM BOOK B
-- 저자 이름은 AUTHOR에만 있으므로 AUTHOR_ID로 이어 붙인다
LEFT JOIN AUTHOR A ON B.AUTHOR_ID = A.AUTHOR_ID
-- 경제 도서만 남긴다
WHERE B.CATEGORY = '경제'
-- 출판일 오름차순
ORDER BY PUBLISHED_DATE
```

# 막혔던 점 / 배운 점

-
