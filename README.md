# 5주차 · Part: 05 | 이번주 학습 내용

### Javascrpit `Object.keys()`
#### 빈 객체 확인하는 방법 3가지
- 객체.keys()
- for in
- lodash : isEmpty
```js
const obj1 = {}
const obj2 = {message: "안 빔"}
const str1 = "one"
const str2 = "" //문자열도 객체이다!

console.log(Object.keys(obj1)) //[]
console.log(Object.keys(obj1)) //['message']

console.log(Object.keys(obj1).length === 0) //false
console.log(Object.keys(obj1).length === 0) //true


function isEmpty(obj) {
	if(Object.keys(obj).length === 0) {
		return true;
	} else {
		return false;
	}
}
```

### `Router`의 역할
Server: Request를 받는다.<br>
Router: Request의 URL에 따라 루트(route)를 정해준다.

Node.js에서의 `라우팅`이란?: Request(요청)이 날라왔을 때, 원하는 경로에 따라 적절한 방향으로 경로를 안내해주는 것
### `Router` 모듈화
```js
const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());
```
Router()를 사용하여, 기존 `app`  → `router` 변경
```js
const express = require('express');
const router = express.Router();
router.use(express.json());
```
아래 코드로 모듈화를 시킨다.
```js
module.exports = router;
```
### `Router` 모듈 적용
```js
const userRouter = require('./routes/user-demo');
app.use("/", userRouter);
```
### `데이터베이스`란?
데이터를 통합하여 `효율적`으로 관리하기 위한 데이터 집합체를 데이터베이스(Database; DB)라고 한다.<br>
데이터를 구조화하여 관리함으로써 데이터 *중복을 막고, 효율적이고 빠른 데이터 연산*을 가능하게 한다.
#### DBMS
데이터베이스를 운영하고 관리하기 위한 DMBS(DataBase Management System)를 통해 데이터베이스를 사용한다.
<br>

`대표적인 3가지 종류`
- ORACLE
- Mysql
- MariaDB

`SQL`

데이터베이스에 연산을 요청하기 위해 사용 되는 언어로 데이터를 생성, 조회, 수정, 삭제 등과 같은 기능을 수행
- 데이터 삽입: INSERT
- 데이터 조회: SELECT
- 데이터 수정: UPDATE
- 데이터 삭제: DELETE

`RDBMS`

관계형 데이터베이스를 생성하고 수정하고 관리할 수 있는 소프트웨어
| 게시글 번호(PK) | 제목 | 내용 | 작성일자 | 수정일자 | 작성자 | 직업 | 생년월일 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | DB란? | DB란 효율적… | 2024-01-01 | 2024-01-01 | 홍길동 | 유튜버 | 970101 |
| 2 | SQL 기본 예제 | SELECT * FR… | 2024-01-01 | 2024-01-02 | 임승찬 | 개발자 | 990301 |
| 3 | 데이터 추가 | INSERT를 사용… | 2024-01-03 | 2024-01-05 | 홍길동 | 유튜버 | 970705 |

`Primary Key: PK(기본키)`
- 해당 테이블의 각 row(행)을 유니크(=유일)하게 구별할 수 있는 key값
- cf. 정규화 = `테이블 분리`

`테이블 분리 장/단점`

게시글

| 게시글 번호(PK) | 제목 | 내용 | 작성일자 | 수정일자 | 사용자 번호(FK) |
| --- | --- | --- | --- | --- | --- |
| 1 | DB란? | DB란 효율적… | 2024-01-01 | 2024-01-01 | 3 |
| 2 | SQL 기본 예제 | SELECT * FR… | 2024-01-01 | 2024-01-02 | 1 |
| 3 | 데이터 추가 | INSERT를 사용… | 2024-01-03 | 2024-01-05 | 2 |

사용자

| 사용자 번호(PK) | 이름 | 직업 | 생년월일 |
| --- | --- | --- | --- |
| 1 | 홍길동 | 유튜버 | 970101 |
| 2 | 임승찬 | 개발자 | 990301 |
| 3 | 홍길동 | 영화 배우 | 970705 |

### Foreign Key: FK(외래키)

- A 테이블에서 B 테이블의 데이터를 찾아가고 싶을 때, 사용하는 key값
    
    *[최대한 B 테이블의 PK 값을 A 테이블의 FK로 사용하는 것이 `이상적`]*

### 실습

#### 사용자 `테이블 생성`
```sql
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	job VARCHAR(100),
	birth DATE,
	PRIMARY KEY (id)
);
```
#### 사용자 `데이터 삽입`
```sql
INSERT INTO users (name, job, birth) VALUES ("홍길동", "유튜버", "970101");
```
#### 게시글 `테이블 생성`
```sql
CREATE TABLE posts (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	content VARCHAR(2000),
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (id)
);
```
#### 게시글`데이터 삽입`
```sql
INSERT INTO posts (title, content) VALUES ("title1", "content1");
```
#### 게시글 `테이블 추가`
```sql
ALTER TABLE posts ADD COLUMN updated_at DATETIME DEFAULT NOW() ON UPDATE NOW();
```
#### 게시글 테이블 `id 2 수정`
```sql
UPDATE posts SET content = "updated!" WHERE id = 2;
```
✨ updated_at도 자동으로 수정된 것을 확인할 수 있다.
#### 게시글 테이블에 `작성자 컬럼 FK 추가`
```sql
ALTER TABLE posts ADD COLUMN user_id INT;
ALTER TABLE posts ADD FOREIGN KEY(user_id) REFERENCES users(id);
```
#### `JOIN`
```sql
SELECT * FROM posts LEFT JOIN users ON posts.user_id = users.id;
```
### MYSQL 날짜/시간 타입

#### `DATE`

- 날짜만
- YYYY-MM-DD

#### `DATETIME`

- 날짜 + 시간
- YYYY-MM-DD HH:MM:SS (24시간제)

#### `TIME`

- 시간
- HH:MM:SS

#### `TIMESTAMP`

- *자동 입력*
- 날짜 + 시간
- YYYY-MM-DD HH:MM:SS (24시간제)
- 시스템 시간대 정보에 맞게 일시를 저장

cf. UTC: 한국 시간 - 9

### `Not Null` vs `Default`

#### Not Null

직접 null이라고 작성해서 넣는것도 안됨

#### Default

값이 안들어올 때, 기본 값으로 셋팅

- 공란으로 insert → Default로 설정 해둔 기본 값이 insert
- 직접 null이라고 작성하면, null setting

### Database 연동
#### mysql2 모듈 설치
```js
npm i mysql2 --save
```
#### mysql2 적용
```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Board',
});
```
#### Query 실행
```js
connection.query("SELECT * FROM `posts`;", (err, rows) => {
    console.log(rows);
});
```

### `timezone`
#### 설정
```sql
SET GLOBAL time_zone = 'Asia/Seoul';
```
#### 확인
```sql
SELECT @@global.time_zone, @@session.time_zone;
```
✨ 현재 세션의 타임존이 안 바뀌어있다면, 다시 설정
```sql
SET time_zone = 'Asia/Seoul';
```
#### Node.js 설정
```js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Board',
    dateStirngs: true
});
```