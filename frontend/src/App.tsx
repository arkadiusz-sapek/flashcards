import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { FlashcardsListCreatePage } from './containers/FlashcardsListCreatePage/ListCreatePage';
import { FlashcardsListPage } from './containers/FlashcardsListPage/FlashcardsListPage';
import { LearningPage } from './containers/LearningPage/LearningPage';
import { OAuthPage } from './containers/OAuthContainer/OAuthContainer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/learning/:id" element={<LearningPage />} />
                <Route path="/auth" element={<OAuthPage />} />
                <Route path="/flashcards-lists/create" element={<FlashcardsListCreatePage />} />
                <Route path="/flashcards-lists" element={<FlashcardsListPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
