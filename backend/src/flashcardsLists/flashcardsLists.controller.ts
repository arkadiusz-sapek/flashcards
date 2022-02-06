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

        const flashcardsLists = await this.flashcardsListService.getForUser(id);

        const flashcardsListsWithFlashcards = await Promise.all(
            flashcardsLists.map(async flashcardList => {
                const flashcards = await this.flashcardsService.getForFlashcardList(
                    flashcardList.id,
                );

                return {
                    ...flashcardList,
                    flashcards,
                };
            }),
        );

        return flashcardsListsWithFlashcards;
    }

    @Post()
    async create(
        @Body() flashcardsList: CreateFlashcardsListDto,
        @Headers('Authorization') auth: string,
    ) {
        const { id } = await this.jwtUtil.decode(auth);

        const flashcardList = await this.flashcardsListService.create(flashcardsList, id);

        const flashcards = flashcardsList.flashcards.map(flashcard =>
            this.flashcardsService.create({ ...flashcard, flashcardList: flashcardList.id }),
        );

        const result = await Promise.all(flashcards);

        return { ...flashcardList, flashcards: result };
    }
}
