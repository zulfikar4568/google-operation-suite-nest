import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OtelInstanceCounter, OtelMethodCounter, Span } from 'nestjs-otel';

@Controller()
@OtelInstanceCounter()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/error')
  @Span('getError')
  @OtelMethodCounter()
  getError(): string {
    this.appService.getError();
    return 'finished';
  }

  @Get('/logger')
  @Span('getLogger')
  @OtelMethodCounter()
  testLogger(): string {
    this.appService.testLogger();
    return 'finished';
  }
}
