// Initialized Observability
import otelSDK from './tracing';
otelSDK.start();

import appConfig from './config/app.config';

// Initialize the Cloud Profiler
import { start } from '@google-cloud/profiler';

start({
  keyFilename: appConfig.KEY_SERVICE_ACCOUNT_PATH,
  projectId: appConfig.PROJECT_ID,
  serviceContext: {
    service: appConfig.APP_NAME,
  },
  logLevel: 3,
});

/**
 * Initialized application Nestjs
 */
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
