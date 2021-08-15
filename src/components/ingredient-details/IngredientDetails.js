import React from "react";
import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {igredientPropTypes} from "../../prop-types";

function IngredientDetails({details}) {
    const nutritionalValue = {
        calories: 'Калории, ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    };
    return (
        <div className={IngredientDetailsStyles.ingredientDetails}>
            <img alt={details.name} src={details.image_large}/>
            <h3 className="text text_type_main-medium">{details.name}</h3>
            <div className={IngredientDetailsStyles.nutritionalValues}>
                {Object.keys(nutritionalValue).map(key => (
                    <div key={key}>
                        <p>{nutritionalValue[key]}</p>
                        <p>{details[key]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    details: PropTypes.shape(igredientPropTypes).isRequired
};

export default IngredientDetails;