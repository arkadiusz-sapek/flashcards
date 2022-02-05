import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateFlashcardDto } from './dto/flashcard.dto';
// import { C } from './dto/flashcard.dto';
import { Flashcard } from './models/flashcard.entity';

@Injectable()
export class FlashcardsService {
    constructor(@InjectRepository(Flashcard) private readonly repo: Repository<Flashcard>) {}

    public async getAll() {
        return await this.repo.find();
    }

    public async getForFlashcardList(flashcardListId: number) {
        return await this.repo.find({ where: { flashcardList: flashcardListId } });
    }

    public async create(company: CreateFlashcardDto) {
        const newFlashcard = this.repo.create(this.transformCreateCompanyToModel(company));
        await this.repo.save(newFlashcard);

        return newFlashcard;
    }

    private transformCreateCompanyToModel(companyDto: CreateFlashcardDto): Flashcard {
        const data = classToPlain(companyDto);

        return plainToClass(Flashcard, data);
    }
}
