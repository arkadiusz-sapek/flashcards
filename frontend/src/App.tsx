import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import shortid from 'shortid';

import './App.css';
import { FlashcardsListCreatePage } from './containers/FlashcardsListCreatePage/ListCreatePage';
import { FlashcardsListPage } from './containers/FlashcardsListPage/FlashcardsListPage';
import { LearningPage } from './containers/LearningPage/LearningPage';
import { OAuthPage } from './containers/OAuthContainer/OAuthContainer';
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

    // console.log(flashcard?WsLists);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/learning/:id" element={<LearningPage />} />
                <Route path="/auth" element={<OAuthPage />} />
                <Route path="/flashcards-lists/create" element={<FlashcardsListCreatePage />} />

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
