import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';
import { configFactory } from './config/config.factory';
import { Config } from './config/config.model';
import { TransientLoggerService } from './logging/transient-logger.service';

declare const module: any;

async function bootstrap() {
    const configService = new ConfigService<Config>(configFactory());

    const logger = new TransientLoggerService(configService);
    logger.setContext('Main');

    const loggerConfig = configService.get('logger');
    const appConfig = configService.get('app');
    const serverConfig = configService.get('server');

    logger.log(`LoggerConfig: ${JSON.stringify(loggerConfig)}`);
    logger.log(`AppConfig: ${JSON.stringify(appConfig)}`);
    logger.log(`ServerConfig: ${JSON.stringify(serverConfig)}`);
    // TODO: Add other configs for logging

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger,
        // cors: true,
        // TODO: Add https stuff
        //httpsOptions: {},
    });
    app.enableCors();

    app.enableShutdownHooks();

    app.use(logger.expressWinstonLogger);
    app.useGlobalPipes(new ValidationPipe());

    app.use(helmet({}));
    app.use(cookieParser());
    // if (serverConfig.csrf) {
    //     app.use(csurf({ cookie: { key: 'XSRF-TOKEN' } }));
    // }
    app.use(
        rateLimit({
            windowMs: serverConfig.rateLimit.windowMs,
            max: serverConfig.rateLimit.maxRequestsPerIpDuringWindow,
        }),
    );
    if (serverConfig.rateLimit.trustProxyClientIpHeader) {
        app.set('trust proxy', 1);
    }

    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle(appConfig.name)
        .setDescription(`The ${appConfig.name} API description`)
        .setVersion(appConfig.version)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(serverConfig.port);

    logger.log(`Application is running on: ${await app.getUrl()}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
