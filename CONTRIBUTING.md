# 기여 가이드

UDIT Monorepo에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 시작하기

1. 저장소를 포크합니다
2. 로컬에 클론합니다
3. 의존성을 설치합니다:

```bash
pnpm install
```

## 개발 워크플로우

### 브랜치 전략

- `main`: 안정적인 프로덕션 브랜치
- `develop`: 개발 브랜치 (선택사항)
- `feature/*`: 새로운 기능 개발
- `fix/*`: 버그 수정
- `docs/*`: 문서 수정

### 코드 스타일

- **TypeScript**: strict 모드 사용
- **포맷팅**: Prettier 사용 (자동 포맷팅)
- **린팅**: ESLint 규칙 준수

코드 제출 전에 다음 명령어를 실행하세요:

```bash
pnpm format
pnpm lint
pnpm type-check
```

### 커밋 컨벤션

다음 형식을 따릅니다:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스 또는 보조 도구 변경

**예시**:
```
feat(logger): add context support

Add ability to include context information in log messages.
This allows for better debugging and traceability.

Closes #123
```

## Pull Request 프로세스

1. 변경사항을 커밋합니다
2. 브랜치를 푸시합니다
3. Pull Request를 생성합니다
4. PR 설명에 다음을 포함하세요:
   - 변경 사항 설명
   - 관련 이슈 번호
   - 테스트 방법

### PR 체크리스트

- [ ] 코드가 린트를 통과합니다
- [ ] 타입 체크를 통과합니다
- [ ] 테스트가 추가되었거나 기존 테스트를 통과합니다
- [ ] 문서가 업데이트되었습니다 (필요한 경우)
- [ ] 커밋 메시지가 컨벤션을 따릅니다

## 테스트

모든 변경사항은 테스트를 포함해야 합니다:

```bash
# 테스트 실행
pnpm test

# 커버리지 확인
pnpm test:coverage
```

## 새 패키지 추가

새 패키지를 추가할 때:

1. `packages/` 디렉토리에 폴더 생성
2. `package.json` 설정
3. `tsconfig.json` 생성 (루트 설정 확장)
4. 테스트 설정 추가
5. README.md 작성
6. Changeset 추가 (버전 변경이 필요한 경우)

## 버전 관리

Changesets를 사용하여 버전을 관리합니다:

```bash
# 변경사항 추가
pnpm changeset

# 버전 업데이트
pnpm version
```

## 질문이 있으신가요?

이슈를 생성하거나 토론에 참여해주세요. 모든 기여를 환영합니다!

