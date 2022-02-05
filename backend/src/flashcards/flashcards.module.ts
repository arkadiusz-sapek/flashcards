import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import { Flashcard } from './models/flashcard.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Flashcard])],
    controllers: [FlashcardsController],
    providers: [FlashcardsService],
    exports: [FlashcardsService],
})
export class FlashcardModule {}
