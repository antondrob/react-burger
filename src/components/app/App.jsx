import React from 'react';
import AppHeader from "../app-header/AppHeader";
import AppStyles from './App.module.css';
import ModalSwitch from '../modal-switch/ModalSwitch';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <AppHeader/>
                <div className={AppStyles.container}>
                    <ModalSwitch />
                </div>
            </Router>
        </>
    );
}

export default App;