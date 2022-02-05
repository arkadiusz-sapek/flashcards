import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { httpService } from '../../services/httpService';
import { FlashcardsList } from '../../types/Flashcard.interface';

export const useStyles = makeStyles({
    title: {
        cursor: 'pointer',
    },
});

interface Props {
    flashcardsLists: FlashcardsList[];
    createFlashCardsList: () => void;
    editFlashCardsList: (list: FlashcardsList) => void;
    removeFlashCardsList: (id: string) => void;
}

export const FlashcardsListCreatePage = () => {
    const [value, setValue] = React.useState('');
    const navigate = useNavigate();

    const handleAddingFlashcards = async () => {
        const flashcards = value
            .replace(/\s+/g, ';')
            .split(';')
            .map(row => {
                const [word, translation] = row.split('-');

                return {
                    word,
                    translation,
                };
            });
        const result = await httpService.post('/', {});
    };
    return (
        <>
            <textarea onChange={val => setValue(val.target.value)} />
            <Button size="small" onClick={() => handleAddingFlashcards()}>
                Add new list
            </Button>
        </>
    );
};
