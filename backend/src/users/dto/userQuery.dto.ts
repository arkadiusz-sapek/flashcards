import { IsEnum, IsOptional } from 'class-validator';

import { UserRole } from './user.dto';

export class UserQueryDto {
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
