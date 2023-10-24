import * as env from 'env-var';
import 'dotenv/config';

export default Object.freeze({
  APP_PORT: env.get('APP_PORT').default(3000).asInt(),
  APP_NAME: env.get('APP_NAME').default('google-app-suite-nest').asString(),
  PROJECT_ID: env.get('PROJECT_ID').required().asString(),
  KEY_SERVICE_ACCOUNT_PATH: env
    .get('KEY_SERVICE_ACCOUNT_PATH')
    .required()
    .asString(),
});
