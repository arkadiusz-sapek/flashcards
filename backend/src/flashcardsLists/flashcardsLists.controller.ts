import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

import { JwtUtilsService } from 'src/auth/jwtUtils.service';

import { CreateFlashcardsListDto } from './dto/flashcardsList.dto';
import { FlashcardsListsService } from './flashcardsLists.service';

@Controller('flashcards-lists')
export class FlashcardsListsController {
    constructor(
        private flashcardsListService: FlashcardsListsService,
        private readonly jwtUtil: JwtUtilsService,
    ) {}

    @Get('all')
    public async getAll() {
        return await this.flashcardsListService.getAll();
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
