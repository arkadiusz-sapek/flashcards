import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlashcardComponent, useStyles } from '../../components/Flashcard/Flashcard';
import flashcardsData from '../../data/words.json';

const flashcardsList = flashcardsData.map((data, index) => ({
    id: index,
    ...data,
    isLearned: false,
}));

export const LearningPage = () => {
    const { card } = useStyles();
    const navigate = useNavigate();
    const [flashcards, setFlashcards] = useState(flashcardsList);

    const [currentFlashcard, setCurrentFlashcard] = useState(flashcardsList[0]);

    const numberOfLearned = flashcards.filter(({ isLearned }) => isLearned).length;

    const setNextCurrentFlashcard = () => {
        const unlearnedFlashcards = flashcards.filter(({ isLearned }) => !isLearned);

        const newCurrentFlashcard =
            unlearnedFlashcards.find(({ id }) => id > currentFlashcard.id) ||
            unlearnedFlashcards[0];

        setCurrentFlashcard(newCurrentFlashcard);
    };

    const markAsLearned = () => {
        setFlashcards([
            ...flashcards.map(flashcard => ({
                ...flashcard,
                isLearned: flashcard.id === currentFlashcard.id ? true : flashcard.isLearned,
            })),
        ]);
        setNextCurrentFlashcard();
    };

    const markAsUnlearnd = () => setNextCurrentFlashcard();

    return (
        <>
            <Button size="small" onClick={() => navigate('/flashcards-lists')}>
                Back
            </Button>
            <Box padding={20}>
                {numberOfLearned === flashcardsList.length ? (
                    <>
                        <Card sx={{ minWidth: 275 }} className={card}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    You Learned all words!
                                </Typography>
                                {flashcards.map(flashcard => (
                                    <Typography
                                        key={flashcard.id}
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {flashcard.word} : {flashcard.translation}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <FlashcardComponent
                        flashcard={currentFlashcard}
                        markAsLearned={markAsLearned}
                        markAsUnlearnd={markAsUnlearnd}
                        numberOfLearned={numberOfLearned}
                        numberOfUnlearned={flashcards.length - numberOfLearned}
                    />
                )}
            </Box>
        </>
    );
};
