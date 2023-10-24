// Initialized Observability
import otelSDK from './tracing';
otelSDK.start();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './filters/http.filter';
import * as expressWinston from 'express-winston';
import { logger, winstonExpressOptions } from './utils/log.util';

const httpServer = new Promise(async (resolve, reject) => {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    // express-winston logger makes sense BEFORE the router
    app.use(expressWinston.logger(winstonExpressOptions));

    await app.listen(3000, () => {
      logger.info(`application running on port ${3000}`);
    });

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

(async function () {
  await Promise.all([httpServer]);
})();
