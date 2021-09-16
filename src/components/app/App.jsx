import React, {useEffect} from 'react';
import AppHeader from "../app-header/AppHeader";
import AppStyles from './App.module.css';
import ModalSwitch from '../modal-switch/ModalSwitch';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";

function App() {
    const dispatch = useDispatch();
    const {items} = useSelector(store => store.ingredients);
    useEffect(() => {
        if (items.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, items.length]);
    return (
        <Router>
            <AppHeader/>
            <div className={AppStyles.container}>
                <ModalSwitch/>
            </div>
        </Router>
    );
}

export default App;