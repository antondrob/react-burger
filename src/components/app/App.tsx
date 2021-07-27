import React from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [state, setState] = React.useState({
        loading: false,
        error: false,
        products: []
    });
    React.useEffect(() => {
        const getProductData = async () => {
            setState({...state, loading: true});
            const res = await fetch(apiUrl);
            const json = await res.json();
            if (json?.success) {
                setState({loading: false, error: false, products: json.data});
            } else {
                setState({...state, loading: false, error: true});
            }
        }

        getProductData();
    }, []);
    return (
        <>
            <AppHeader/>
            <div className={AppStyles.container}>
                <h1>Соберите бургер</h1>
                <main className={AppStyles.content}>
                    <BurgerIngredients products={state.products}/>
                    <BurgerConstructor products={state.products}/>
                </main>
            </div>
        </>
    );
}

export default App;