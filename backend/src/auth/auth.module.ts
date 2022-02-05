import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/config.model';
import { JwtStrategy } from './jwt.strategy';
import { JwtUtilsService } from './jwtUtils.service';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService<Config>) => configService.get('jwt'),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtUtilsService],
    exports: [AuthService, JwtUtilsService],
})
export class AuthModule {}
