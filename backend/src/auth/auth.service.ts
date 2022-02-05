import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/models/user.entity';

import { UsersService } from '../users/users.service';

const client = new OAuth2Client(
    '157216207997-ct2ng5l5f7qd4b269voeo3d3fvn3jeat.apps.googleusercontent.com',
);

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signToken({ id, email }: User) {
        const token = this.jwtService.sign({ id });

        return {
            id,
            email,
            token,
        };
    }

    async createAccount(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.createUser({ email, password: hash });

        const userData = await this.signToken(newUser);

        return userData;
    }

    async register(user: CreateUserDto) {
        const { email, password } = user;

        const emailExists = await this.usersService.getUserByEmail(email);

        if (emailExists) {
            throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return await this.createAccount(email, password);
    }

    async login(login: CredentialsDto) {
        const { email, password } = login;

        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const comparePasswords = await bcrypt.compare(password, user.password);

        if (!comparePasswords) {
            throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const userData = await this.signToken(user);

        return userData;
    }

    async obtainTokenByOAuth(token: string) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const result = ticket.getPayload();

        if (!result) {
            throw new HttpException('Invalid OAuth token', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const user = await this.usersService.getUserByEmail(result.email);

        if (user) {
            const userData = await this.signToken(user);

            return userData;
        }

        return await this.createAccount(
            result.email,
            `!${Math.random()
                .toString(36)
                .slice(-5)}`,
        );
    }
}
