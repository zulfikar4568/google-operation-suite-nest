import { LoggingWinston } from '@google-cloud/logging-winston';
import { WinstonModuleOptions, utilities } from 'nest-winston';
import { transports } from 'winston';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const gcpTransport = new LoggingWinston({
  projectId: 'lab-experiment-70',
  keyFilename:
    '/Users/zulfikar4568/Documents/gcp/fundamental/google-operation-suite-nest/lab-experiment.json',
});

const consoleTransport = new transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    utilities.format.nestLike('Google Suite App Nest', {
      colors: true,
      prettyPrint: true,
    }),
  ),
});

export const winstonModuleOptions: WinstonModuleOptions = {
  level: 'info',
  transports: [
    consoleTransport,
    // Add Cloud Logging
    gcpTransport,
  ],
};

export const logger = winston.createLogger(winstonModuleOptions);

export const winstonExpressOptions: expressWinston.LoggerOptions = {
  level: 'info',
  transports: [
    consoleTransport,
    // Add Cloud Logging
    gcpTransport,
  ],
};
