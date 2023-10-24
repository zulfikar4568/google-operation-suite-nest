import { ErrorReporting } from '@google-cloud/error-reporting';
import appConfig from 'src/config/app.config';

export function reportError(exception: any) {
  // Instantiates a client
  const errors = new ErrorReporting({
    projectId: appConfig.PROJECT_ID,
    keyFilename: appConfig.KEY_SERVICE_ACCOUNT_PATH,
    reportMode: 'always',
  });

  // Reports an exception
  errors.report(exception.stack);
}
