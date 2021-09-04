import styles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";

export const HomePage = () => {
    const dispatch = useDispatch();
    const {items} = useSelector(store => store.ingredients);
    useEffect(() => {
        if (items.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, items.length]);
    return (
        <>
            <h1>Соберите бургер</h1>
            <main className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    )
}