import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from './exceptions/common.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  testLogger(): void {
    this.logger.info('Message Logging trial 123');
  }

  getError(): string {
    try {
      JSON.parse('{"malformedJson": true');
      return 'finish';
    } catch (error: any) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST.toString(),
        message: error.message,
        params: {
          exception: error,
        },
      });
    }
  }
}
