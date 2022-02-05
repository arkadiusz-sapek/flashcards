import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { CreateFlashcardDto } from 'src/flashcards/dto/flashcard.dto';

export class CreateFlashcardsListDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    flashcards: CreateFlashcardDto[];
}

export class FlashcardListDto extends CreateFlashcardsListDto {
    id: number;
}
