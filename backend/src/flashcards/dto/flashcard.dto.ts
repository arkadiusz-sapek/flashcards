import { IsNumber, IsNotEmpty, IsMilitaryTime, IsString } from 'class-validator';

export class CreateFlashcardDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsMilitaryTime()
    reservationAvailabilityStart: string;

    @IsMilitaryTime()
    reservationAvailabilityEnd: string;
}

export class FlashcardDto extends CreateFlashcardDto {
    id: number;
}
