# @udit/logger

유연하고 강력한 로깅 유틸리티로, TypeScript와 JavaScript 프로젝트에서 사용할 수 있습니다.

## 특징

- 📝 **다양한 로그 레벨**: info, warn, error, debug
- 🎯 **컨텍스트 지원**: 구조화된 컨텍스트 정보 포함
- 🐛 **에러 처리**: Error 객체 자동 구조화
- ⚙️ **유연한 설정**: 개발/프로덕션 모드, 최소 로그 레벨 설정
- 🏷️ **서비스 식별**: 서비스 이름으로 로그 구분
- 📅 **타임스탬프**: 자동 타임스탬프 포맷팅

## 설치

```bash
npm install @udit/logger
# 또는
pnpm add @udit/logger
# 또는
yarn add @udit/logger
```

## 기본 사용법

```typescript
import { logger } from '@udit/logger'

// 간단한 로그
logger.info('Application started')
logger.warn('This is a warning')
logger.error('An error occurred')
logger.debug('Debug information') // 개발 모드에서만 출력
```

## 고급 사용법

### 커스텀 옵션으로 Logger 생성

```typescript
import { Logger } from '@udit/logger'

const logger = new Logger({
  serviceName: 'my-service',
  isDevelopment: true,
  minLevel: 'info',
  context: {
    version: '1.0.0',
    environment: 'production',
  },
})

logger.info('Service initialized')
// 출력: [2024-01-01 12:00:00][my-service] [INFO] Service initialized
// {"version":"1.0.0","environment":"production"}
```

### 컨텍스트 정보 포함

```typescript
import { logger } from '@udit/logger'

logger.info('User logged in', {
  userId: 123,
  email: 'user@example.com',
  ip: '192.168.1.1',
})
```

### 에러 로깅

```typescript
import { logger } from '@udit/logger'

try {
  // some code
} catch (error) {
  logger.error('Operation failed', error)
  // Error 객체가 자동으로 구조화됩니다
}
```

### 컨텍스트와 에러 함께 사용

```typescript
import { logger } from '@udit/logger'

try {
  // some code
} catch (error) {
  logger.error('Payment processing failed', { orderId: 456 }, error)
}
```

## API

### Logger 클래스

#### 생성자

```typescript
new Logger(options?: LoggerOptions)
```

#### 옵션

```typescript
interface LoggerOptions {
  /**
   * 개발 모드 여부 (debug 로그를 출력할지 결정)
   * @default process.env.NODE_ENV === 'development'
   */
  isDevelopment?: boolean

  /**
   * 서비스 식별자
   */
  serviceName?: string

  /**
   * 최소 로그 레벨 (이 레벨 이상만 출력)
   * @default 'debug'
   */
  minLevel?: 'debug' | 'info' | 'warn' | 'error'

  /**
   * 기본 컨텍스트 정보
   */
  context?: Record<string, unknown>
}
```

#### 메서드

- `info(message: string, ...args: unknown[]): void` - 정보 로그
- `warn(message: string, ...args: unknown[]): void` - 경고 로그
- `error(message: string, ...args: unknown[]): void` - 에러 로그
- `debug(message: string, ...args: unknown[]): void` - 디버그 로그 (개발 모드에서만)

### 기본 logger 인스턴스

```typescript
import { logger } from '@udit/logger'

// NODE_ENV 환경 변수로 개발 모드를 자동 감지
logger.info('Ready to use')
```

## 로그 레벨

로그 레벨은 다음 우선순위를 가집니다:

1. `debug` (0) - 가장 낮은 레벨
2. `info` (1)
3. `warn` (2)
4. `error` (3) - 가장 높은 레벨

`minLevel` 옵션을 설정하면 해당 레벨 이상의 로그만 출력됩니다.

## 예제

### Express.js 미들웨어

```typescript
import { Logger } from '@udit/logger'
import express from 'express'

const logger = new Logger({
  serviceName: 'api-server',
  context: { version: '1.0.0' },
})

app.use((req, res, next) => {
  logger.info('Request received', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  })
  next()
})
```

### 에러 핸들러

```typescript
import { logger } from '@udit/logger'

app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    method: req.method,
    path: req.path,
  }, err)
  
  res.status(500).json({ error: 'Internal server error' })
})
```

## 라이센스

MIT

## 기여

기여 가이드는 [CONTRIBUTING.md](../../CONTRIBUTING.md)를 참조하세요.
