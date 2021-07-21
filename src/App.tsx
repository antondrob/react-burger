import React from 'react';
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import './App.css';
import BurgerIngredientsStyles from "./components/burger-ingredients/BurgerIngredientsStyles.module.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";

function App() {
    return (
        <>
            <AppHeader />
            <div className="container">
                <h1>Соберите бургер</h1>
                <main className="content">
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </div>
        </>
    );
}

export default App;
