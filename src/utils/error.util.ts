import { ErrorReporting } from '@google-cloud/error-reporting';

export function reportError(exception: any) {
  // Instantiates a client
  const errors = new ErrorReporting({
    projectId: 'lab-experiment-70',
    reportMode: 'always',
  });

  // Reports an exception
  errors.report(exception.stack);
}
