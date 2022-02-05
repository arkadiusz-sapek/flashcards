import { Controller, Get, Headers, Query } from '@nestjs/common';
import { JwtUtilsService } from 'src/auth/jwtUtils.service';
import { UserQueryDto } from './dto/userQuery.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private readonly utils: JwtUtilsService) {}

    @Get()
    public async getAll(@Query() queryParams: UserQueryDto) {
        return await this.usersService.getAll(queryParams);
    }

    @Get('me')
    public async getUserData(@Headers('Authorization') auth: string) {
        const { id } = await this.utils.decode(auth);

        return await this.usersService.getUserData(id);
    }
}
