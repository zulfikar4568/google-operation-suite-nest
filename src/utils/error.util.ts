import { ErrorReporting } from '@google-cloud/error-reporting';

export function reportError(exception: any) {
  // Instantiates a client
  const errors = new ErrorReporting({
    projectId: 'lab-experiment-70',
    keyFilename:
      '/Users/zulfikar4568/Documents/gcp/fundamental/google-operation-suite-nest/lab-experiment.json',
    reportMode: 'always',
  });

  // Reports an exception
  errors.report(exception.stack);
}
