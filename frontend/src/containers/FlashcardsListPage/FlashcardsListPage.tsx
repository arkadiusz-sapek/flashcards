import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

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

export const FlashcardsListPage = ({
    flashcardsLists,
    createFlashCardsList,
    removeFlashCardsList,
}: Props) => {
    const navigate = useNavigate();
    const styles = useStyles();
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
                                key={flashcardList.name}
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
                                    <Button onClick={() => removeFlashCardsList(flashcardList.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button size="small" onClick={() => createFlashCardsList()}>
                Add new list
            </Button>
        </>
    );
};
