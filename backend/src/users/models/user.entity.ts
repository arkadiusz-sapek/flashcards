import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FlashcardList } from 'src/flashcardsLists/models/flashcardList.entity';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(
        type => FlashcardList,
        flashcardList => flashcardList.user,
    )
    flashcardsList: FlashcardList[];
}
