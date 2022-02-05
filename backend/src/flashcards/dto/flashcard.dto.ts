import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlashcardDto {
    @IsNotEmpty()
    @IsString()
    word: string;

    @IsNotEmpty()
    @IsString()
    translation: string;

    @IsNotEmpty()
    @IsNumber()
    flashcardList: number;
}
export class FlashcardDto extends CreateFlashcardDto {
    id: number;
}
