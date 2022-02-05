import { Controller, Get } from '@nestjs/common';



import { FlashcardsService } from './flashcards.service';

// import { FlashcardDto } from './dto/flashcard.dto';

@Controller('flashcards')
export class FlashcardsController {
    constructor(private flashcardsService: FlashcardsService) {}

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
