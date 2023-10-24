import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import * as process from 'process';
import appConfig from './config/app.config';

/**
 * Enabled this for debugging
 */
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const otelSDK = new NodeSDK({
  serviceName: appConfig.APP_NAME,
  metricReader: new PrometheusExporter({
    port: 8081,
  }),
  spanProcessor: new BatchSpanProcessor(
    new TraceExporter({
      projectId: appConfig.PROJECT_ID,
      keyFilename: appConfig.KEY_SERVICE_ACCOUNT_PATH,
    }),
  ),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
  instrumentations: [
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new WinstonInstrumentation({
      enabled: true,
      logHook: (_span, record) => {
        record['resource.service.name'] = appConfig.APP_NAME;
      },
    }),
  ],
});

export default otelSDK;

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
