import React from "react";
import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/ModalOverlay";

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
    details: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }).isRequired
};

export default IngredientDetails;