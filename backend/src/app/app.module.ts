import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { FlashcardModule } from 'src/flashcards/flashcards.module';
import { FlashcardsListsModule } from 'src/flashcardsLists/flashcardsLists.module';

import { AuthModule } from '../auth/auth.module';
import { configFactory } from '../config/config.factory';
import { Config } from '../config/config.model';
import { HealthModule } from '../health/health.module';
import { TransientLoggerModule } from '../logging/transient-logger.module';
import { TransientLoggerService } from '../logging/transient-logger.service';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configFactory],
        }),
        TransientLoggerModule,
        AuthModule,
        UsersModule,
        FlashcardModule,
        FlashcardsListsModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (
                configService: ConfigService<Config>,
                logger: TransientLoggerService,
            ) => {
                const dbConfig = configService.get('db');
                return {
                    ...dbConfig,
                    autoLoadEntities: true,
                    logging: log => dbConfig.loggingFn(logger, log),
                };
            },
            inject: [ConfigService, TransientLoggerService],
        }),
        HealthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'www'),
            exclude: ['/api*'],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
