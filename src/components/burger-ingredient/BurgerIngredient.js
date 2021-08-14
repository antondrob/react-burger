import {SHOW_INGREDIENT} from "../../services/actions/ingredient";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientStyles from "../burger-ingredient/BurgerIngredientStyles.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";

const BurgerIngredient = ({item}) => {
    const dispatch = useDispatch();
    const burger = useSelector(store => store.burger);
    const itemId = item._id
    const qty = item.type === 'bun' && burger.bun?._id === item._id ? 2 : item.type !== 'bun' ? burger.notBun.filter(el => el._id === item._id).length : 0;

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: {itemId},
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });
    return (
        !isDrag && (
            <li onClick={(e) => {
                dispatch({type: SHOW_INGREDIENT, item: item});
            }} ref={dragRef}>
                {qty > 0 &&
                <Counter count={qty} size="default"/>}
                <div className={BurgerIngredientStyles.listItem}>
                    <img src={item.image} alt={item.name}/>
                    <span
                        className={BurgerIngredientStyles.listItemPrice}>{item.price}
                        <CurrencyIcon
                            type="primary"/></span>
                    <h3 className={BurgerIngredientStyles.listItemTitle}>{item.name}</h3>
                </div>
            </li>
        )
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.shape({
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

export default BurgerIngredient;