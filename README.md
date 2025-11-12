# UDIT Monorepo

UDIT에서 개발한 모든 라이브러리와 패키지를 관리하는 monorepo입니다.

## 개요

이 monorepo는 pnpm workspaces와 Turborepo를 사용하여 여러 패키지를 효율적으로 관리합니다. 현재는 JavaScript/TypeScript 기반 npm 패키지를 제공하며, 향후 다른 언어의 라이브러리도 지원할 예정입니다.

## 기술 스택

- **Package Manager**: pnpm
- **Build System**: Turborepo
- **Language**: TypeScript
- **Testing**: Jest
- **Versioning**: Changesets
- **CI/CD**: GitHub Actions

## 패키지 목록

### @udit-org/logger

유연한 로깅 유틸리티로, 컨텍스트 지원 및 에러 처리를 제공합니다.

```bash
pnpm add @udit-org/logger
```

자세한 내용은 [packages/logger/README.md](packages/logger/README.md)를 참조하세요.

## 설치

```bash
# pnpm 설치 (필요한 경우)
npm install -g pnpm

# 의존성 설치
pnpm install
```

## 개발 가이드

### 새 패키지 추가

1. `packages/` 디렉토리에 새 패키지 폴더 생성
2. `package.json` 생성 및 설정
3. `tsconfig.json` 생성 (루트 설정 확장)
4. 필요한 경우 테스트 설정 추가

### 스크립트

```bash
# 모든 패키지 빌드
pnpm build

# 모든 패키지 테스트
pnpm test

# 린트 검사
pnpm lint

# 타입 체크
pnpm type-check

# 코드 포맷팅
pnpm format

# 개발 모드 (watch)
pnpm dev

# 보안 감사
pnpm audit
```

### Changesets를 사용한 버전 관리

```bash
# 변경사항 추가
pnpm changeset

# 버전 업데이트 및 CHANGELOG 생성
pnpm version

# 배포
pnpm release
```

## 배포 가이드

### npm 배포

1. Changesets를 사용하여 변경사항 추가
2. 버전 업데이트 (`pnpm version`)
3. 배포 (`pnpm release`)

GitHub Actions가 자동으로 배포를 처리합니다.

### 수동 배포

```bash
# 빌드
pnpm build

# 특정 패키지 배포
cd packages/logger
pnpm publish --access public
```

## 기여 방법

기여 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

## 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

## 보안

보안 취약점을 발견한 경우 [SECURITY.md](SECURITY.md)를 참조하여 보고해주세요.

