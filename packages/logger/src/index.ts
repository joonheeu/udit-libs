import { Logger, type LogLevel, type LoggerOptions } from './logger.js'

export { Logger, type LogLevel, type LoggerOptions }

/**
 * 기본 로거 인스턴스
 * 개발 모드는 NODE_ENV 환경 변수로 자동 감지됩니다.
 */
export const logger = new Logger()

