import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { configFactory } from 'src/config/config.factory';
import { Config } from 'src/config/config.model';
import { HealthModule } from 'src/health/health.module';
import { TransientLoggerModule } from 'src/logging/transient-logger.module';
import { TransientLoggerService } from 'src/logging/transient-logger.service';
import { ReservationsModule } from 'src/reservations/reservations.module';

import { UsersModule } from 'src/users/users.module';
import { Seeder } from './seeder';

@Module({
    imports: [
        UsersModule,
        TransientLoggerModule,
        AuthModule,
        UsersModule,
        CompaniesModule,
        ReservationsModule,
        HealthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configFactory],
        }),
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
    ],
    providers: [Seeder],
})
export class SeedsModule {}
