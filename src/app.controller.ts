import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/error')
  getError(): string {
    this.appService.getError();
    return 'finished';
  }

  @Get('/logger')
  testLogger(): string {
    this.appService.testLogger();
    return 'finished';
  }
}
