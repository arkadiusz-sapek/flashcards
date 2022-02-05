import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';

import { JwtUtilsService } from 'src/auth/jwtUtils.service';
import { FlashcardsService } from 'src/flashcards/flashcards.service';

import { CreateFlashcardsListDto } from './dto/flashcardsList.dto';
import { FlashcardsListsService } from './flashcardsLists.service';

@Controller('flashcards-lists')
export class FlashcardsListsController {
    constructor(
        private flashcardsListService: FlashcardsListsService,
        private flashcardsService: FlashcardsService,
        private readonly jwtUtil: JwtUtilsService,
    ) {}

    @Get('all')
    public async getAll() {
        return await this.flashcardsListService.getAll();
    }

    @Get(':id')
    public async getFlashcard(@Param('id') id: number) {
        const flashcards = await this.flashcardsService.getForFlashcardList(id);
        const flashcardList = await this.flashcardsListService.getById(id);

        return { ...flashcardList, flashcards };
    }

    @Get()
    public async getForUser(@Headers('Authorization') auth: string) {
        const { id } = await this.jwtUtil.decode(auth);

        return await this.flashcardsListService.getForUser(id);
    }

    @Post()
    async create(@Body() company: CreateFlashcardsListDto, @Headers('Authorization') auth: string) {
        const { id } = await this.jwtUtil.decode(auth);

        return this.flashcardsListService.create(company, id);
    }
}
