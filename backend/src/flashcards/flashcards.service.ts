import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { C } from './dto/flashcard.dto';
import { Flashcard } from './models/flashcard.entity';

@Injectable()
export class FlashcardsService {
    constructor(@InjectRepository(Flashcard) private readonly repo: Repository<Flashcard>) {}

    public async getAll() {
        return await this.repo.find();
    }

    public async getForFlashcardList(flashcardListId: number) {
        return await this.repo.findOne({ where: { flashcardList: flashcardListId } });
    }
}
