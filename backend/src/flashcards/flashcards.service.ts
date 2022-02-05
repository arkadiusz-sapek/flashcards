import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass, classToPlain } from 'class-transformer';

// import { C } from './dto/flashcard.dto';
import { Flashcard } from './models/flashcard.entity';

@Injectable()
export class FlashcardsService {
    constructor(@InjectRepository(Flashcard) private readonly repo: Repository<Flashcard>) {}

    public async getAll() {
        return await this.repo.find();
    }

    // public async getForClient(userId: number) {
    //     return await this.companyRepo.findOne({ where: { user: userId } });
    // }

    // public async create(company: CreateCompanyDto, userId: number) {
    //     const newCompany = this.companyRepo.create(
    //         this.transformCreateCompanyToModel(company, userId),
    //     );
    //     await this.companyRepo.save(newCompany);

    //     return newCompany;
    // }

    // private transformCreateCompanyToModel(companyDto: CreateCompanyDto, userId: number): Company {
    //     const data = classToPlain({ ...companyDto, user: userId });

    //     return plainToClass(Company, data);
    // }
}
