import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientStyles from "../burger-ingredient/BurgerIngredientStyles.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import {igredientPropTypes} from "../../prop-types";
import {Link, useLocation} from "react-router-dom";

const BurgerIngredient = ({item}) => {
    const location = useLocation();
    const ingredientId = item['_id'];
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
            <Link
                className={BurgerIngredientStyles.listItem}
                ref={dragRef}
                to={{
                    pathname: `/ingredients/${ingredientId}`,
                    state: {background: location},
                }}
            >
                {qty > 0 && <Counter count={qty} size="default"/>}
                <div className={BurgerIngredientStyles.listItemContent}>
                    <img src={item.image} alt={item.name}/>
                    <span
                        className={BurgerIngredientStyles.listItemPrice}>{item.price}
                        <CurrencyIcon
                            type="primary"/></span>
                    <h3 className={BurgerIngredientStyles.listItemTitle}>{item.name}</h3>
                </div>
            </Link>
        )
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.shape(igredientPropTypes).isRequired
};

export default BurgerIngredient;