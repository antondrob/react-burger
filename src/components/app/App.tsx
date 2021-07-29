import React from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Data from '../../utils/data';

function App() {
    return (
        <>
            <AppHeader />
            <div className={AppStyles.container}>
                <h1>Соберите бургер</h1>
                <main className={AppStyles.content}>
                    <BurgerIngredients products={Data} />
                    <BurgerConstructor products={Data} />
                </main>
            </div>
        </>
    );
}

export default App;