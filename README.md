# Frontend
프론트-AI 기반 프롬프트 최적화 웹 서비스




##  Git / Github
### 📌 브랜치 전략 (main, develop과 feat)
- `main(=master)`: 오직 **배포**를 위한 브랜치
- `develop`: 팀원끼리 **작업한 내용(feature)을** 합치는 곳
- `feat`: 우리가 **각 작업에 따라** 새로 파고 사용할 브랜치
> 하나의 feat 브랜치는 하나의 Issue와 연결된다!

<br>

### 📌 브랜치 네이밍 컨벤션
`커밋 컨벤션/#이슈번호/페이지 or 기능 이름`
❗여러 단어가 연결된다면 하이픈(-)으로 연결한다.❗

**예시**
> `setting/#1/router-setting` `feat/#5/login` `fix/#6/register-form-bug-fix`

<br>

###  📌 커밋 컨벤션

`커밋컨벤션: 커밋 메시지 (#이슈번호)`

📑 Git 커밋 메시지컨
이모지	태그	설명
✨	Feat	새로운 기능 추가
🐛	Fix	버그 수정
♻️	Refactor	코드 리팩토링
💄	Style	UI 스타일 수정
🔥	Del	코드 삭제 / 미사용 리소스 제거
📝	Chore	문서 작성/수정
🚀	Deploy	배포 관련 작업
✅	Test	테스트 코드 추가/수정
💡 커밋 메시지 예시
git commit -m "✨ Feat: 테마 선택 기능 추가"
git commit -m "🐛 Fix: 로그인 시 500 오류 수정"
git commit -m "💄 Style: 로그인 버튼 색상 변경"
git commit -m "🔥 Del: 사용하지 않는 console.log 제거"

**예시**
> `feat: login form 구현 (#4)` `refactor: image upload 로직 커스텀훅으로 분리 (#12)`

<br>

###  📌 브랜치 병합(merge) & 기본 규칙

- 메인 브랜치(main, develop)에서 직접적인 커밋은 하지 않는다.
- 무조건 작업 브랜치(feat)에서만 커밋을 찍어야 하고, 브랜치 병합(merger)은 PR(Pull Request)을 통해서만 가능하다.
- 작업 전에는 항상 `git pull origin develop`을 통해 각 feature 브랜치를 최신화해서 관리한다.
- 팀원들의 리뷰 이후 1prove를 받아야 merger 할 수 있다.

<br>
##  코딩 컨벤션
### 📌 기본 (Default) 네이밍
1. 컴포넌트 / class   
`PascalCase`
2. 폴더명   
`carmelCase`  
3. 파일 명 *(컴포넌트 제외)*   
`carmelCase`  
4. 변수, 함수    
`carmelCase`
5. 파라미터    
`carmelCase`
6. 상수    
`BIG_SNAKE_CASE`
<br>

### 📌 변수
1. 변수 선언 시 `var`는 사용하지 않는다.
- 되도록 `const`를 사용. 필요한 경우에 `let`을 사용한다.
2. 전역 변수는 최대한 지양한다.
3. 구조 분해 할당은 적극적으로 활용한다.
예시
```jsx
 const { name, age } = user; // name = "진혁", age = 25
```
4. 변수를 조합해서 문자열 만들때는 무조건  `템플릿 리터럴(`: 벡틱)`을 이용한다.
5. 변수와 함수는 의미를 잘 이해할 수 있도록 네이밍한다. **(줄임말 사용 금지)**
- 만약 추가적인 이해가 필요하다면 주석을 통해 이해를 돕는다.
<br>

### 📌 함수
- 함수는 기본적으로 화살표 함수를 사용한다.
- 변수와 함수는 의미를 잘 이해할 수 있도록 네이밍한다. **(줄임말 사용 금지)**
- 이벤트 핸들러 네이밍 :*`handle + 기능 + 이벤트`    
```jsx
const handleBtnClick = () => {};
const handleTabChange = () => {};
```
<br>

- 값이 boolean일 경우는 `is + 상태` (default)
 ```tsx
const [isLogined, setIsLogined] = useState(false);
```
> 추가적으로 `can / should / has` 정도를 상황에 맞게 추가한다.
<br>
    
- api 함수 `HTTP 메서드 + 명사`
```tsx
const getList = () => {}
const getMovie = () => {}
```



<br>

### 📌 타입 (TS)
- 기본적으로 모든 타입에는 뒤에 `-Types`를 붙인다.
- 컴포넌트 인자에 대한 타입은 컴포넌트 바로 상단에 선언한다.
- 외적으로 Props 타입은 `컴포넌트명+PropTypes` 
```jsx
interface IntroductionPropTypes {
name: string;
age: number;
}
        
const Introduction = ({ title, description }: IntroductionPropTypes ) => {
        
}
```
        
- object는 `interface`, 단일 변수는 `type`으로 선언한다.

<br


