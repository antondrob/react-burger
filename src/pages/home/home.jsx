import styles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import React from "react";
import {useSelector} from "react-redux";
import Loading from "../../components/loading/Loading";

export const HomePage = () => {
    const {items, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);
    return (
        <>
            <h1>Соберите бургер</h1>
            <main className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    {items.length > 0 ? <BurgerIngredients/> :
                        <Loading request={ingredientsRequest} fail={ingredientsFailed}/>
                    }
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    )
}