/**
 * 로그 레벨 타입
 */
export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

/**
 * 로그 레벨 우선순위 (낮은 숫자가 더 낮은 레벨)
 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

/**
 * 로거 옵션
 */
export interface LoggerOptions {
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
   */
  minLevel?: LogLevel

  /**
   * 기본 컨텍스트 정보
   */
  context?: Record<string, unknown>
}

/**
 * 로거 유틸리티
 */
class Logger {
  private isDevelopment: boolean
  private serviceName?: string
  private minLevel: LogLevel
  private context?: Record<string, unknown>

  constructor(options: LoggerOptions = {}) {
    // NODE_ENV가 설정되지 않은 경우 기본값은 'development'로 간주
    const nodeEnv = process.env.NODE_ENV || 'development'
    this.isDevelopment =
      options.isDevelopment ?? nodeEnv === 'development'
    this.serviceName = options.serviceName
    this.minLevel = options.minLevel ?? 'debug'
    this.context = options.context
  }

  /**
   * 타임스탬프를 YYYY-MM-DD HH:mm:ss 형식으로 포맷
   */
  private formatTimestamp(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  /**
   * 로그 레벨이 최소 레벨 이상인지 확인
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.minLevel]
  }

  /**
   * 에러 객체를 구조화된 형태로 변환
   */
  private formatError(error: unknown): unknown {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    }
    return error
  }

  /**
   * 컨텍스트 정보를 메시지에 포함
   */
  private formatContext(context?: Record<string, unknown>): string {
    const allContext = { ...this.context, ...context }
    if (Object.keys(allContext).length === 0) {
      return ''
    }
    // 개발 환경에서는 들여쓰기 추가, 프로덕션에서는 압축
    const indent = this.isDevelopment ? 2 : undefined
    return `\n${JSON.stringify(allContext, null, indent)}`
  }

  /**
   * 로그 메시지 포맷
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): string {
    const timestamp = this.formatTimestamp(new Date())
    const servicePrefix = this.serviceName ? `[${this.serviceName}]` : ''
    const levelPrefix = `[${level.toUpperCase()}]`
    const contextStr = this.formatContext(context)
    return `[${timestamp}]${servicePrefix} ${levelPrefix} ${message}${contextStr}`
  }

  /**
   * 로그 출력
   */
  private log(
    level: LogLevel,
    message: string,
    ...args: unknown[]
  ): void {
    // 로그 레벨 필터링
    if (!this.shouldLog(level)) {
      return
    }

    // debug 레벨은 개발 모드에서만 출력
    if (level === 'debug' && !this.isDevelopment) {
      return
    }

    // 첫 번째 인자가 객체이고 Error가 아닌 경우 컨텍스트로 간주
    const firstArg = args[0]
    let context: Record<string, unknown> | undefined
    let errorArg: unknown | undefined
    let remainingArgs: unknown[] = []

    if (
      firstArg &&
      typeof firstArg === 'object' &&
      !(firstArg instanceof Error) &&
      !Array.isArray(firstArg)
    ) {
      context = firstArg as Record<string, unknown>
      remainingArgs = args.slice(1)
    } else {
      remainingArgs = args
    }

    // Error 객체 찾기
    for (const arg of remainingArgs) {
      if (arg instanceof Error) {
        errorArg = this.formatError(arg)
        break
      }
    }

    const formattedMessage = this.formatMessage(level, message, context)
    const logArgs: unknown[] = []

    // 에러 객체가 있으면 구조화된 형태로 추가
    if (errorArg) {
      logArgs.push(errorArg)
    }

    // 나머지 인자 추가
    const otherArgs = remainingArgs.filter((arg) => !(arg instanceof Error))
    if (otherArgs.length > 0) {
      logArgs.push(...otherArgs)
    }

    switch (level) {
      case 'error':
        console.error(formattedMessage, ...logArgs)
        break
      case 'warn':
        console.warn(formattedMessage, ...logArgs)
        break
      case 'debug':
        console.debug(formattedMessage, ...logArgs)
        break
      case 'info':
      default:
        console.log(formattedMessage, ...logArgs)
        break
    }
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args)
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args)
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args)
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args)
  }
}

export { Logger }

