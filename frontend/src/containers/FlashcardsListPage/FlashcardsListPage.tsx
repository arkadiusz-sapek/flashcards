import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { httpService } from '../../services/httpService';
import { FlashcardsList } from '../../types/Flashcard.interface';

export const useStyles = makeStyles({
    title: {
        cursor: 'pointer',
    },
});

export const FlashcardsListPage = () => {
    const [flashcardsLists, setFlashcardsLists] = useState<FlashcardsList[]>([]);
    const navigate = useNavigate();
    const styles = useStyles();

    const loadFlashcardsLists = async () => {
        const newFlascahrdsLists = await httpService.get<any>('/flashcards-lists');

        setFlashcardsLists(newFlascahrdsLists.data);
    };

    useEffect(() => {
        loadFlashcardsLists();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Number of words</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flashcardsLists.map(flashcardList => (
                            <TableRow
                                key={flashcardList.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={styles.title}
                                    onClick={() => navigate(`/learning/${flashcardList.id}`)}
                                >
                                    {flashcardList.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {flashcardList.flashcards.length}
                                </TableCell>
                                <TableCell align="right">
                                    <Button>Edit</Button>
                                    <Button onClick={() => console.log('remove')}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button size="small" onClick={() => navigate('/flashcards-lists/create')}>
                Add new list
            </Button>
        </>
    );
};
