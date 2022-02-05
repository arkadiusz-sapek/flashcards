import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateFlashcardDto } from './dto/flashcard.dto';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
    constructor(private flashcardsService: FlashcardsService) {}

    @Get('all')
    public async getAll() {
        return await this.flashcardsService.getAll();
    }

    @Get(':id')
    public async getForFlashcardList(@Param('id') id) {
        return await this.flashcardsService.getForFlashcardList(id);
    }

    @Post()
    async create(@Body() company: CreateFlashcardDto) {
        return this.flashcardsService.create(company);
    }
}
