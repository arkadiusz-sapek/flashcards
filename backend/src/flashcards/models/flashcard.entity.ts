import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FlashcardList } from 'src/flashcardsLists/models/flashcardList.entity';

@Entity()
export class Flashcard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string;

    @Column()
    translation: string;

    @ManyToOne(
        type => FlashcardList,
        flashcardList => flashcardList.flashcards,
    )
    @JoinColumn({ name: 'flashcardListId' })
    flashcardList: FlashcardList;
}
