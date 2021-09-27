import React from "react";
import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {TIngredient, TIngredientDetailsProps, TNutritionalValue, TPreloadedState} from "../../services/types";

function IngredientDetails({details}: TIngredientDetailsProps) {
    const {id} = useParams<{ id?: string }>();
    const {items} = useSelector((store: TPreloadedState) => store.ingredients);

    const ingredient: TIngredient | undefined = details ?? items.find(el => el._id === id);

    const nutritionalValue: TNutritionalValue = {
        calories: 'Калории, ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    };

    return (
        ingredient ? <div className={IngredientDetailsStyles.ingredientDetails}>
            <img alt={ingredient.name} src={ingredient.image_large}/>
            <h3 className="text text_type_main-medium">{ingredient.name}</h3>
            <div className={IngredientDetailsStyles.nutritionalValues}>
                {Object.keys(nutritionalValue).map((key) => {
                    return (
                        <div key={key}>
                            <p>{nutritionalValue[key]}</p>
                            <p>{ingredient[key as keyof typeof ingredient]}</p>
                        </div>
                    )
                })}
            </div>
        </div> : null
    )
}

export default IngredientDetails;