import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UtilsService } from './utils.services';

@Module({
    imports: [JwtModule],
    providers: [UtilsService],
    exports: [UtilsService],
})
export class UtilsModule {}
