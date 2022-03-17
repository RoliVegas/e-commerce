import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import './App.css';

const Shop = () => {
    return (
        <div>
            <div>
                <h1>Shop</h1>
            </div>
        </div>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                {/* index{true} == render if the parent element ('/') is matched. */ } 
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='sign-in' element={<SignIn />} />
            </Route>
        </Routes>
    );
};

export default App;