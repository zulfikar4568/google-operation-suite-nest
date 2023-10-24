// Initialized Observability
import otelSDK from './tracing';
otelSDK.start();

/**
 * Initialized application Nestjs
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './filters/http.filter';
import * as expressWinston from 'express-winston';
import { logger, winstonExpressOptions } from './utils/log.util';
import appConfig from './config/app.config';

const httpServer = new Promise(async (resolve, reject) => {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    // express-winston logger makes sense BEFORE the router
    app.use(expressWinston.logger(winstonExpressOptions));

    await app.listen(appConfig.APP_PORT, () => {
      logger.info(`application running on port ${appConfig.APP_PORT}`);
    });

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

(async function () {
  await Promise.all([httpServer]);
})();
