import { Injectable, Logger, LoggerService } from '@nestjs/common';

// Sets up the built-in Arcjet logger to use the NestJS logger
@Injectable()
export class ArcjetLogger implements LoggerService {
  private readonly logger = new Logger(ArcjetLogger.name);

  log(message, ...optionalParams) {
    this.logger.log(message, ...optionalParams);
  }

  fatal(message, ...optionalParams) {
    this.logger.error(message, ...optionalParams);
  }

  error(message, ...optionalParams) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message, ...optionalParams) {
    this.logger.warn(message, ...optionalParams);
  }

  debug(message, ...optionalParams) {
    this.logger.debug(message, ...optionalParams);
  }

  info(message, ...optionalParams) {
    this.logger.log(message, ...optionalParams);
  }
}
