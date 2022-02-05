import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UtilsService {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): { id: number } {
        const jwt = auth.replace('Bearer ', '');

        return this.jwtService.decode(jwt, { json: true }) as { id: number };
    }
}
