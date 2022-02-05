import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { internet } from 'faker';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class Seeder {
    constructor(private readonly usersService: UsersService) {}

    async seed() {
        const users = await this.seedUsers();
    }
    async seedUsers() {
        const password = await bcrypt.hash('commonPassword123*', 10);

        const users = Array(50)
            .fill(null)
            .map(async () =>
                this.usersService.createUser({
                    email: internet.email(),
                    password,
                }),
            );

        return Promise.all(users);
    }
}
