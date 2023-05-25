import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaOpiniones from './components/ListaOpiniones';
import Principal from './components/Principal';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Principal/>} />
            <Route path='/opiniones' element={<ListaOpiniones/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);