import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlashcardsListsService } from './flashcardsLists.service';
import { FlashcardsListsController } from './flashcardsLists.controller';
import { FlashcardList } from './models/flashcardList.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([FlashcardList])],
    controllers: [FlashcardsListsController],
    providers: [FlashcardsListsService],
    exports: [FlashcardsListsService],
})
export class FlashcardsListsModule {}
