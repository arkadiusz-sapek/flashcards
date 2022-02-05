import { IsNumber, IsNotEmpty, IsMilitaryTime, IsString } from 'class-validator';

export class CreateFlashcardsListDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class FlashcardListDto extends CreateFlashcardsListDto {
    id: number;
}
