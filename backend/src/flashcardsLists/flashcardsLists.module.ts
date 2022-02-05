import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { FlashcardModule } from 'src/flashcards/flashcards.module';

import { FlashcardsListsController } from './flashcardsLists.controller';
import { FlashcardsListsService } from './flashcardsLists.service';
import { FlashcardList } from './models/flashcardList.entity';

@Module({
    imports: [AuthModule, FlashcardModule, TypeOrmModule.forFeature([FlashcardList])],
    controllers: [FlashcardsListsController],
    providers: [FlashcardsListsService],
    exports: [FlashcardsListsService],
})
export class FlashcardsListsModule {}
