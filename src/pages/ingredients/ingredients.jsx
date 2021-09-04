import React, {useEffect} from "react";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from './ingredients.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {NotFoundPage} from "../not-found/not-found";

export const IngredientsPage = () => {
    const {items} = useSelector(store => store.ingredients);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (items.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, items.length]);
    const ingredient = items.length > 0 ? items.find(el => el._id === id) : null;
    return (
        ingredient === undefined ? <NotFoundPage/> :
            ingredient !== null ?
                <>
                    <h1 className={`text text_type_main-large ${styles.heading}`}>Детали ингредиента</h1>
                    <IngredientDetails details={ingredient}/>
                </> : null
    )
}