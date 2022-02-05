import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilsService {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): { id: number } {
        if (typeof auth !== 'string') {
            throw new HttpException(
                'Invalid token. User is not authenticated',
                HttpStatus.UNAUTHORIZED,
            );
        }
        const jwt = auth.replace('Bearer ', '');

        return this.jwtService.decode(jwt, { json: true }) as { id: number };
    }
}
