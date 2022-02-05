import { Controller, Get, Headers } from '@nestjs/common';

import { JwtUtilsService } from 'src/auth/jwtUtils.service';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private readonly utils: JwtUtilsService) {}

    @Get()
    public async getAll() {
        return await this.usersService.getAll();
    }

    @Get('me')
    public async getUserData(@Headers('Authorization') auth: string) {
        const { id } = await this.utils.decode(auth);

        return await this.usersService.getUserData(id);
    }
}
