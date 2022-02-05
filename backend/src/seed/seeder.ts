import { Injectable } from '@nestjs/common';
import { internet, random, lorem, datatype, company, date } from 'faker';
import * as bcrypt from 'bcryptjs';

import { UserDto, UserRole } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { ReservationsService } from 'src/reservations/reservations.service';
import { CompaniesService } from 'src/companies/companies.service';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { Company } from 'src/companies/models/company.entity';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class Seeder {
    constructor(
        private readonly usersService: UsersService,
        private readonly companiesService: CompaniesService,
        private readonly reservationsService: ReservationsService,
    ) {}

    async seed() {
        const users = await this.seedUsers();
        const companies = await this.seedCompanies(users);
        await this.seedReservations(users, companies);
    }
    async seedUsers() {
        const password = await bcrypt.hash('commonPassword123*', 10);

        const users = Array(50)
            .fill(null)
            .map(async () =>
                this.usersService.createUser({
                    email: internet.email(),
                    password,
                    role: random.arrayElement(Object.values(UserRole)),
                }),
            );

        return Promise.all(users);
    }

    async seedCompanies(users: UserDto[]) {
        const companies = users
            .filter(({ role }) => role === UserRole.Client)
            .map(async user =>
                this.companiesService.create(
                    {
                        name: company.companyName(),
                        description: lorem.sentences(),
                        reservationAvailabilityStart: `${datatype
                            .datetime()
                            .getHours()}:${datatype.datetime().getMinutes()}`,
                        reservationAvailabilityEnd: `${datatype
                            .datetime()
                            .getHours()}:${datatype.datetime().getMinutes()}`,
                    },
                    user.id,
                ),
            );

        return Promise.all(companies);
    }

    async seedReservations(users: User[], companies: Company[]) {
        const reservations = users
            .filter(({ role }) => role === UserRole.Consultant)
            .map(consultant =>
                Array(datatype.number({ min: 1, max: 15 }))
                    .fill(null)
                    .map(() => {
                        const today = new Date();
                        const startRange = new Date(today);
                        startRange.setDate(startRange.getDate() - 7);
                        const endRange = new Date(today);
                        endRange.setDate(endRange.getDate() + 7);

                        const startDate = date.between(startRange, endRange);
                        const endDate = new Date(startDate);
                        endDate.setHours(startDate.getHours() + 3);

                        return this.reservationsService.create({
                            title: lorem.sentence(),
                            description: lorem.sentences(),
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                            company: datatype.number({ min: 1, max: companies.length }),
                            user: consultant.id,
                        });
                    }),
            );
        return Promise.all([].concat(...reservations));
    }
}
