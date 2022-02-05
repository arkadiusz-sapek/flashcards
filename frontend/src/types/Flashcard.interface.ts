export interface Flashcard {
    id: number;
    word: string;
    translation: string;
    isLearned: boolean;
}

export interface FlashcardsList {
    id: string;
    name: string;
    flashcards: Flashcard[];
}
