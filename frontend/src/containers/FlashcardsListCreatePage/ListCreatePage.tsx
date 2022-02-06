import Button from '@mui/material/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { httpService } from '../../services/httpService';

export const FlashcardsListCreatePage = () => {
    const [value, setValue] = React.useState('');
    const [name, setName] = React.useState('');

    const navigate = useNavigate();

    const handleAddingFlashcards = async () => {
        const flashcards = value.split(/\s+/g).map(row => {
            const [word, translation] = row.split('-');

            return {
                word,
                translation,
            };
        });
        await httpService.post('/flashcards-lists', { name, flashcards });
        navigate('/flashcards-lists');
    };

    return (
        <>
            <input onChange={val => setName(val.target.value)} />
            <textarea onChange={val => setValue(val.target.value)} />
            <Button size="small" onClick={() => handleAddingFlashcards()}>
                Add new list
            </Button>
        </>
    );
};
