import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateFlashcardsListDto } from './dto/flashcardsList.dto';
import { FlashcardList } from './models/flashcardList.entity';

@Injectable()
export class FlashcardsListsService {
    constructor(
        @InjectRepository(FlashcardList) private readonly repo: Repository<FlashcardList>,
    ) {}

    public async getAll() {
        return await this.repo.find();
    }

    public async getForUser(userId: number) {
        return await this.repo.find({ where: { user: userId } });
    }

    public async getById(id: number) {
        return await this.repo.findOne({ where: { id } });
    }

    public async create(flashcardsList: CreateFlashcardsListDto, userId: number) {
        const newFlashcardsList = this.repo.create(
            this.transformCreateFlashcardsListToModel(flashcardsList, userId),
        );
        await this.repo.save(newFlashcardsList);

        return newFlashcardsList;
    }
    private transformCreateFlashcardsListToModel(
        flashcardDto: CreateFlashcardsListDto,
        userId: number,
    ): FlashcardList {
        const data = classToPlain({ ...flashcardDto, user: userId });

        return plainToClass(FlashcardList, data);
    }
}
