import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import _ from 'lodash/fp';
import shortid from 'shortid';

import './App.css';
import { LearningPage } from './containers/LearningPage/LearningPage';
import { FlashcardsListPage } from './containers/FlashcardsListPage/FlashcardsListPage';
import flashcardsData from './data/words.json';
import { FlashcardsList } from './types/Flashcard.interface';

const firstList = flashcardsData.map((data, index) => ({
    id: index,
    ...data,
    isLearned: false,
}));

const updateStorage = (flashcards: FlashcardsList[]) => {
    localStorage.setItem('flashcardsLists', JSON.stringify(flashcards));
};

const oldFlashcardsLists = JSON.parse(localStorage.getItem('flashcardsLists') || '');

function App() {
    const [flashcardsLists, setFlashcardsLists] = useState<FlashcardsList[]>(
        oldFlashcardsLists || [
            {
                id: shortid.generate(),
                name: 'fastlane words',
                flashcards: firstList,
            },
        ],
    );

    const createNewList = () => {
        const id = shortid.generate();
        const newList = {
            id,
            name: `New list ${id}`,
            flashcards: [],
        };
        setFlashcardsLists([...flashcardsLists, newList]);
    };

    const editList = (flashcardLists: FlashcardsList) => {
        setFlashcardsLists(
            flashcardsLists.map(item => (item.id === flashcardLists.id ? flashcardLists : item)),
        );
    };

    const removeList = (id: string) => {
        setFlashcardsLists(flashcardsLists.filter(item => item.id !== id));
    };

    useEffect(() => {
        updateStorage(flashcardsLists);
    }, [flashcardsLists]);

    console.log(flashcardsLists);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/learning/:id" element={<LearningPage />} />
                <Route
                    path="/flashcards-lists"
                    element={
                        <FlashcardsListPage
                            flashcardsLists={flashcardsLists}
                            createFlashCardsList={createNewList}
                            editFlashCardsList={editList}
                            removeFlashCardsList={removeList}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
