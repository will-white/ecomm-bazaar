import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication, Logger } from '@nestjs/common';
import { FastifyInstance } from 'fastify';
import { ConfigService } from '@nestjs/config';
// import { RequestClosedInterceptor } from './utils/interceptors/request-closed.interceptor';
import helmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';

// Eventually OpenTelemetry
// https://www.tomray.dev/nestjs-open-telemetry#how-to-set-up-automatic-tracing-in-nestjs
// https://www.tomray.dev/nestjs-open-telemetry#optimizing-tracing-performance

export async function setupOpenAPI(
  app: INestApplication,
  fastify: FastifyInstance,
  configService: ConfigService,
  port: number | string
) {
  const path = '/' + configService.get<string | undefined>('OPENAPI_PATH');
  const username = configService.get<string | undefined>('OPENAPI_USERNAME');
  const password = configService.get<string | undefined>('OPENAPI_PASSWORD');

  const config = new DocumentBuilder()
    .setTitle('Bazaar')
    .setDescription('Entire API for Bazaar')
    .setVersion(configService.get('npm_package_version') ?? 'unknown')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    // .setSchemes('https')
    .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup(swaggerPath, app, document);

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-argument
  await fastify.register(require('@scalar/fastify-api-reference'), {
    routePrefix: path,
    configuration: {
      theme: 'default',
      spec: {
        content: SwaggerModule.createDocument(app, config),
      },
    },
  });

  Logger.log(`Docs are up and running on: http://localhost:${port}${path}`);

  // Add basic auth to openapi page
  fastify.after(() => {
    fastify.addHook('onRequest', (request, reply, next) => {
      if (
        process.env.NODE_ENV === 'production' &&
        request.url.startsWith(path)
      ) {
        try {
          const base64AuthString = request.headers.authorization?.split(' ')[1];
          const authString = Buffer.from(
            base64AuthString ?? '',
            'base64'
          ).toString('utf8');

          if (
            username === authString.split(':')[0] &&
            password === authString.split(':')[1]
          ) {
            next();
            return;
          }
        } catch {
          //
        }

        void reply
          .header('WWW-Authenticate', 'Basic realm="Swagger"; charset=UTF-8')
          .status(401)
          .send();
      }

      next();
    });
  });
}

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const server = adapter.getInstance<FastifyInstance>();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { bufferLogs: true }
  );
  const configService = app.get<ConfigService>(ConfigService);

  // https://stackoverflow.com/questions/50949231/nestjs-enable-cors-in-production
  // https://github.com/nestjs/nest/issues/1134
  await app.register(helmet);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.register(fastifyCookie, {
    secret: configService.getOrThrow<string | undefined>('COOKIE_SECRET'),
  });

  const port = configService.get<string | undefined>('PORT') ?? 3000;

  await setupOpenAPI(app, server, configService, port);

  await app.listen(port, '0.0.0.0');

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

void bootstrap();
