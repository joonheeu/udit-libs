import { Logger, logger, type LoggerOptions } from '../src/index.js'

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance
  let consoleWarnSpy: jest.SpyInstance
  let consoleDebugSpy: jest.SpyInstance

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleDebugSpy.mockRestore()
  })

  describe('기본 기능', () => {
    it('info 로그를 출력해야 함', () => {
      const testLogger = new Logger()
      testLogger.info('Test message')
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] Test message')
      )
    })

    it('warn 로그를 출력해야 함', () => {
      const testLogger = new Logger()
      testLogger.warn('Warning message')
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] Warning message')
      )
    })

    it('error 로그를 출력해야 함', () => {
      const testLogger = new Logger()
      testLogger.error('Error message')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Error message')
      )
    })

    it('debug 로그를 출력해야 함 (개발 모드)', () => {
      const testLogger = new Logger({ isDevelopment: true })
      testLogger.debug('Debug message')
      expect(consoleDebugSpy).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG] Debug message')
      )
    })
  })

  describe('로그 레벨 필터링', () => {
    it('minLevel이 warn일 때 info 로그는 출력하지 않아야 함', () => {
      const testLogger = new Logger({ minLevel: 'warn' })
      testLogger.info('Info message')
      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('minLevel이 warn일 때 warn 로그는 출력해야 함', () => {
      const testLogger = new Logger({ minLevel: 'warn' })
      testLogger.warn('Warning message')
      expect(consoleWarnSpy).toHaveBeenCalled()
    })

    it('minLevel이 error일 때 warn 로그는 출력하지 않아야 함', () => {
      const testLogger = new Logger({ minLevel: 'error' })
      testLogger.warn('Warning message')
      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })
  })

  describe('개발/프로덕션 모드', () => {
    it('프로덕션 모드에서 debug 로그는 출력하지 않아야 함', () => {
      const testLogger = new Logger({ isDevelopment: false })
      testLogger.debug('Debug message')
      expect(consoleDebugSpy).not.toHaveBeenCalled()
    })

    it('개발 모드에서 debug 로그는 출력해야 함', () => {
      const testLogger = new Logger({ isDevelopment: true })
      testLogger.debug('Debug message')
      expect(consoleDebugSpy).toHaveBeenCalled()
    })
  })

  describe('컨텍스트 정보', () => {
    it('컨텍스트 정보를 포함해야 함', () => {
      const testLogger = new Logger()
      testLogger.info('Test message', { userId: 123, action: 'login' })
      const callArgs = consoleLogSpy.mock.calls[0][0]
      expect(callArgs).toContain('Test message')
      expect(callArgs).toContain('userId')
      expect(callArgs).toContain('123')
    })

    it('기본 컨텍스트를 포함해야 함', () => {
      const testLogger = new Logger({
        context: { service: 'test-service' },
      })
      testLogger.info('Test message')
      const callArgs = consoleLogSpy.mock.calls[0][0]
      expect(callArgs).toContain('service')
      expect(callArgs).toContain('test-service')
    })

    it('기본 컨텍스트와 추가 컨텍스트를 병합해야 함', () => {
      const testLogger = new Logger({
        context: { service: 'test-service' },
      })
      testLogger.info('Test message', { userId: 123 })
      const callArgs = consoleLogSpy.mock.calls[0][0]
      expect(callArgs).toContain('service')
      expect(callArgs).toContain('userId')
    })
  })

  describe('에러 객체 처리', () => {
    it('Error 객체를 구조화해야 함', () => {
      const testLogger = new Logger()
      const error = new Error('Test error')
      testLogger.error('Error occurred', error)
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Error occurred'),
        expect.objectContaining({
          name: 'Error',
          message: 'Test error',
          stack: expect.any(String),
        })
      )
    })

    it('컨텍스트와 에러를 함께 처리해야 함', () => {
      const testLogger = new Logger()
      const error = new Error('Test error')
      testLogger.error('Error occurred', { userId: 123 }, error)
      expect(consoleErrorSpy).toHaveBeenCalled()
      const callArgs = consoleErrorSpy.mock.calls[0]
      expect(callArgs[0]).toContain('[ERROR] Error occurred')
      expect(callArgs[1]).toMatchObject({
        name: 'Error',
        message: 'Test error',
      })
    })
  })

  describe('타임스탬프 포맷팅', () => {
    it('타임스탬프를 올바른 형식으로 포맷해야 함', () => {
      const testLogger = new Logger()
      testLogger.info('Test message')
      const callArgs = consoleLogSpy.mock.calls[0][0]
      // YYYY-MM-DD HH:mm:ss 형식 확인
      expect(callArgs).toMatch(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/)
    })
  })

  describe('서비스 이름', () => {
    it('서비스 이름을 포함해야 함', () => {
      const testLogger = new Logger({ serviceName: 'my-service' })
      testLogger.info('Test message')
      const callArgs = consoleLogSpy.mock.calls[0][0]
      expect(callArgs).toContain('[my-service]')
    })
  })

  describe('기본 logger 인스턴스', () => {
    it('기본 logger 인스턴스를 export해야 함', () => {
      expect(logger).toBeInstanceOf(Logger)
    })

    it('기본 logger 인스턴스로 로그를 출력할 수 있어야 함', () => {
      logger.info('Test message')
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })
})

