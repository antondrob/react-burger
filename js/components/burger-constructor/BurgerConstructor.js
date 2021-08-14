import React, { useContext } from 'react';
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructorStyles.module.css';
import PropTypes from "prop-types";
import { BurgerContext } from '../../services/contexts/BurgerContext';
function BurgerConstructor({ openModal }) {
    const products = useContext(BurgerContext);
    const bunItems = products.filter((el, index) => el.type === 'bun' && index === 0);
    const mainItems = products.filter(el => el.type === 'main');
    const sauceItems = products.filter(el => el.type === 'sauce');
    let FilteredProducts = [...bunItems, ...mainItems, ...sauceItems];
    const chosenBun = FilteredProducts.find(({ type }) => type === 'bun');
    const orderTotal = FilteredProducts.reduce(function (acc, obj) {
        let price = obj.price;
        if (obj.type === 'bun') {
            price += obj.price;
        }
        return acc + price;
    }, 0) / 100;
    return (<section className={BurgerConstructorStyles.rightSidebar}>
            <div className={BurgerConstructorStyles.cart}>
                <div>
                    {chosenBun && (<ConstructorElement type="top" isLocked={true} text={`${chosenBun.name} (верх)`} price={chosenBun.price / 100} thumbnail={chosenBun.image_mobile}/>)}
                </div>
                <div className={BurgerConstructorStyles.ingredients}>
                    {FilteredProducts.map((el, index) => {
            if (el.type !== 'bun') {
                return (<div className={BurgerConstructorStyles.chosenItem} key={el._id + index}>
                                    <DragIcon />
                                    <ConstructorElement style={{ width: '100%' }} text={el.name} price={el.price / 100} thumbnail={el.image_mobile}/>
                                </div>);
            }
            else {
                return null;
            }
        })}
                </div>
                <div>
                    {chosenBun && (<ConstructorElement type="bottom" isLocked={true} text={`${chosenBun.name} (низ)`} price={chosenBun.price / 100} thumbnail={chosenBun.image_mobile}/>)}
                </div>
            </div>
            <div className={BurgerConstructorStyles.checkout}>
                <div className={BurgerConstructorStyles.total}>{orderTotal} <CurrencyIcon type="primary"/></div>
                <div>
                    <Button onClick={() => openModal()} type="primary" size="large">Оформить заказ</Button>
                </div>
            </div>
        </section>);
}
BurgerConstructor.propTypes = {
    openModal: PropTypes.func
};
export default BurgerConstructor;
