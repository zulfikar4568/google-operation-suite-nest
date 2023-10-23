import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './filters/http.filter';
import * as expressWinston from 'express-winston';
import { logger, winstonExpressOptions } from './utils/log.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  // express-winston logger makes sense BEFORE the router
  app.use(expressWinston.logger(winstonExpressOptions));

  await app.listen(3000, () => {
    logger.info(`application running on port ${3000}`);
  });
}
bootstrap();
