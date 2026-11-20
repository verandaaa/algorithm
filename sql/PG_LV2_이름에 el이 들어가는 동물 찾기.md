https://school.programmers.co.kr/learn/courses/30/lessons/59047

유형: String, Date

# 핵심 아이디어

- 이름 어딘가에 `el`이 들어 있는지는 `LIKE '%EL%'`로 찾는다. `%`는 앞뒤에 어떤 글자가 몇 개 와도 된다는 뜻이다.
- MySQL 기본 콜레이션은 대소문자를 구분하지 않아서 `'%EL%'`로도 `Elijah`, `Daniella`가 함께 잡힌다.

# Pass 1 - MySQL

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
-- 이름에 el이 들어간 개만 (기본 콜레이션이라 대소문자 무시)
WHERE NAME LIKE '%EL%' AND ANIMAL_TYPE IN ('Dog')
-- 이름순, 같은 이름이면 아이디순
ORDER BY NAME, ANIMAL_ID
```

# 막혔던 점 / 배운 점

-
