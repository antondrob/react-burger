import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {getIngredients} from '../../services/actions';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const ingredient = useSelector(store => store.ingredient);
    const order = useSelector(store => store.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <div className={AppStyles.container}>
                <h1>Соберите бургер</h1>
                <main className={AppStyles.content}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            </div>
            {ingredient && Object.keys(ingredient).length > 0 && ingredient.constructor === Object && (
                <Modal>
                    <IngredientDetails details={ingredient}/>
                </Modal>
            )}
            {order.data && Object.keys(order.data).length > 0 && order.data.constructor === Object && (
                <Modal>
                    <OrderDetails/>
                </Modal>
            )}
        </>
    );
}

export default App;