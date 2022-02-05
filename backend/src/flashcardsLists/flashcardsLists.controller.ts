import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { JwtUtilsService } from 'src/auth/jwtUtils.service';

import { FlashcardsListsService } from './flashcardsLists.service';
// import { FlashcardDto } from './dto/flashcard.dto';

@Controller('flashcards')
export class FlashcardsListsController {
    constructor(private flashcardsService: FlashcardsListsService) {}

    @Get()
    public async getAll() {
        return await this.flashcardsService.getAll();
    }

    // @Get('client')
    // public async getForClient(@Headers('Authorization') auth: string) {
    //     const { id } = await this.jwtUtil.decode(auth);

    //     return await this.companiesService.getForClient(id);
    // }

    // @Post()
    // async create(@Body() company: CreateCompanyDto, @Headers('Authorization') auth: string) {
    //     const { id } = await this.jwtUtil.decode(auth);

    //     return this.companiesService.create(company, id);
    // }
}
