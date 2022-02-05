import { IsEmail, IsEnum, MinLength, Matches } from 'class-validator';

export enum UserRole {
    Client = 'CLIENT',
    Consultant = 'CONSULTANT',
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(8, {
        message: 'Password need to have 8 characters at least',
    })
    @Matches(/(?=.*[a-z])/, {
        message: 'Password need to contain 1 lowercase character',
    })
    @Matches(/(?=.*[A-Z])/, {
        message: 'Password need to contain 1 uppercase character',
    })
    @Matches(/(?=.*[0-9])/, {
        message: 'Password need to contain 1 number',
    })
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
export class UserDto extends CreateUserDto {
    id: number;
}
