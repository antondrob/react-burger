import React from "react";
import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";
import PropTypes from "prop-types";
import {igredientPropTypes} from "../../prop-types";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function IngredientDetails({details}) {
    const {id} = useParams();
    const {items} = useSelector(store => store.ingredients);

    const ingredient = details ?? items.find(el => el._id === id);

    const nutritionalValue = {
        calories: 'Калории, ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    };
    return (
        <div className={IngredientDetailsStyles.ingredientDetails}>
            <img alt={ingredient.name} src={ingredient.image_large}/>
            <h3 className="text text_type_main-medium">{ingredient.name}</h3>
            <div className={IngredientDetailsStyles.nutritionalValues}>
                {Object.keys(nutritionalValue).map(key => (
                    <div key={key}>
                        <p>{nutritionalValue[key]}</p>
                        <p>{ingredient[key]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    details: PropTypes.shape(igredientPropTypes)
};

export default IngredientDetails;