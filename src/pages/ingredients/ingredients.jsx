import React from "react";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from './ingredients.module.css';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {NotFoundPage} from "../not-found/not-found";
import Loading from "../../components/loading/Loading";

export const IngredientsPage = () => {
    const {items, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);
    const {id} = useParams();
    const ingredient = items.length > 0 ? items.find(el => el._id === id) ?? null : null;
    return (
        ingredient ? (
            <>
                <h1 className={`text text_type_main-large ${styles.heading}`}>Детали ингредиента</h1>
                <IngredientDetails details={ingredient}/>
            </>
        ) : ingredientsRequest ? <Loading request={ingredientsRequest} fail={ingredientsFailed}/> :
            <NotFoundPage/>
    )
}