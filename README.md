# Example of GCP (Cloud Logging, Error Reporting, Cloud Trace, Profiler)

![Google Ops](./images//Google%20Ops.svg)

For logging we used [winston](https://www.npmjs.com/package/winston) as a logger and [express-winston](https://www.npmjs.com/package/express-winston) as middleware of express http request then inject the span and trace using [opentelemetry/instrumentation-winston](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston), and use [opentelemetry](https://opentelemetry.io/) as observability, there's metrics as well which on port `8081`, you can access in `http://localhost:8081/metrics` or you can configured in `./src/tracing.ts`

### Role's need
- Cloud Logging Service Agent
- Cloud Profiler Agent
- Cloud Trace Agent
- Error Reporting Writer
- Logs Writer

### Change the .env.example into .env
```bash
# config for GCP
PROJECT_ID=<your-project-id>
KEY_SERVICE_ACCOUNT_PATH=<your-service-account-path>
```

### Running the application
```bash
yarn start:dev
```