import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FlashcardComponent, useStyles } from '../../components/Flashcard/Flashcard';
import { httpService } from '../../services/httpService';
import { Flashcard } from '../../types/Flashcard.interface';

export const LearningPage = () => {
    const { card } = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | undefined>();

    const loadFlashcardsList = async () => {
        const result = await httpService.get(`/flashcards-lists/${id}`);
        setFlashcards(result.data.flashcards);
        setCurrentFlashcard(result.data.flashcards[0]);
    };

    useEffect(() => {
        loadFlashcardsList();
    }, []);

    const numberOfLearned = flashcards.filter(({ isLearned }) => isLearned).length;

    const setNextCurrentFlashcard = () => {
        const unlearnedFlashcards = flashcards.filter(({ isLearned }) => !isLearned);

        const newCurrentFlashcard =
            unlearnedFlashcards.find(
                unlearnedFlashcard => unlearnedFlashcard.id > (currentFlashcard?.id || 0),
            ) || unlearnedFlashcards[0];

        setCurrentFlashcard(newCurrentFlashcard);
    };

    const markAsLearned = () => {
        setFlashcards([
            ...flashcards.map(flashcard => ({
                ...flashcard,
                isLearned: flashcard.id === currentFlashcard?.id ? true : flashcard.isLearned,
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
                {numberOfLearned === flashcards.length ? (
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
                    <>
                        {currentFlashcard && (
                            <FlashcardComponent
                                flashcard={currentFlashcard}
                                markAsLearned={markAsLearned}
                                markAsUnlearnd={markAsUnlearnd}
                                numberOfLearned={numberOfLearned}
                                numberOfUnlearned={flashcards.length - numberOfLearned}
                            />
                        )}
                    </>
                )}
            </Box>
        </>
    );
};
