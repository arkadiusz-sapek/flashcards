import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlashcardsListDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class FlashcardListDto extends CreateFlashcardsListDto {
    id: number;
}
