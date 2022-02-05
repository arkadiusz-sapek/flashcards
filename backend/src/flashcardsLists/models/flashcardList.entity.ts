import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import { User } from 'src/users/models/user.entity';
import { Flashcard } from 'src/flashcards/models/flashcard.entity';

@Entity()
export class FlashcardList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => Flashcard,
        flashcard => flashcard.flashcardList,
    )
    flashcards: Flashcard[];

    @ManyToOne(
        type => User,
        user => user.flashcardsList,
    )
    @JoinColumn({ name: 'userId' })
    user: User;
}
