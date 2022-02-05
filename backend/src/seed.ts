import { NestFactory } from '@nestjs/core';

import { SeedsModule } from './seed/seed.module';
import { Seeder } from './seed/seeder';

async function bootstrap() {
    NestFactory.createApplicationContext(SeedsModule)
        .then(appContext => {
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(() => {})
                .catch(error => {
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();
