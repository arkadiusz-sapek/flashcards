import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/core';
import { Flashcard } from '../../types/Flashcard.interface';

export const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
    },
});

interface Props {
    flashcard: Flashcard;
    numberOfLearned: number;
    numberOfUnlearned: number;
    markAsLearned: (flashcard: Flashcard) => void;
    markAsUnlearnd: (flashcard: Flashcard) => void;
}

export const FlashcardComponent = (props: Props) => {
    const [showMeaning, setShowMeaning] = useState(false);

    const { card } = useStyles();

    const readWordwithSynth = () => {
        const msg = new SpeechSynthesisUtterance();
        msg.lang = 'en-US';

        msg.text = props.flashcard.word;
        window.speechSynthesis.speak(msg);
    };

    return (
        <Card sx={{ minWidth: 275 }} className={card}>
            <CardContent
                onClick={() => {
                    setShowMeaning(!showMeaning);
                }}
            >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Learned: {props.numberOfLearned}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Unlearned: {props.numberOfUnlearned}
                </Typography>

                <Box marginTop={10}>
                    <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                        fontWeight={'bold'}
                    >
                        {props.flashcard.word}
                    </Typography>
                </Box>

                {showMeaning && (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.flashcard.translation}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        props.markAsLearned(props.flashcard);
                        setShowMeaning(false);
                    }}
                >
                    Leanred
                </Button>
                <Button size="small" onClick={() => readWordwithSynth()}>
                    Voice
                </Button>
                <Button
                    size="small"
                    onClick={() => {
                        props.markAsUnlearnd(props.flashcard);
                        setShowMeaning(false);
                    }}
                >
                    Unlearned
                </Button>
            </CardActions>
        </Card>
    );
};
