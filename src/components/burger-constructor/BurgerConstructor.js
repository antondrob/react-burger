import React, {useContext} from 'react';
import {
    DragIcon,
    CurrencyIcon,
    ConstructorElement,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructorStyles.module.css';
import PropTypes from "prop-types";
import {constructorContext} from '../../contexts/constructorContext';

// import {constructorReducer} from '../../contexts/constructorReducer';

function BurgerConstructor({products, openModal}) {
    const {currentConstructor, dispatchConstructor} = useContext(constructorContext);
    const chosenBun = currentConstructor.items.find(({type}) => type === 'bun');
    const orderTotal = currentConstructor.items.reduce(function (acc, obj) {
        let price = obj.price;
        if (obj.type === 'bun') {
            price += obj.price;
        }
        return acc + price;
    }, 0) / 100;
    return (
        <section className={BurgerConstructorStyles.rightSidebar}>
            <div className={BurgerConstructorStyles.cart}>
                <div>
                    {chosenBun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={chosenBun.name}
                            price={chosenBun.price / 100}
                            thumbnail={chosenBun.image_mobile}
                        />
                    )}
                </div>
                <div className={BurgerConstructorStyles.ingredients}>
                    {currentConstructor.items.map((el, index) => {
                        if (el.type !== 'bun') {
                            return (
                                <div className={BurgerConstructorStyles.chosenItem} key={el._id + index}>
                                    <DragIcon/>
                                    <ConstructorElement
                                        style={{width: '100%'}}
                                        text={el.name}
                                        price={el.price / 100}
                                        thumbnail={el.image_mobile}
                                        handleClose={() => {
                                            dispatchConstructor({
                                                type: 'remove', payload: {
                                                    item: el,
                                                    index: index
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div>
                    {chosenBun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={chosenBun.name}
                            price={chosenBun.price / 100}
                            thumbnail={chosenBun.image_mobile}
                        />
                    )}
                </div>
            </div>
            <div className={BurgerConstructorStyles.checkout}>
                <div className={BurgerConstructorStyles.total}>{orderTotal} <CurrencyIcon type="primary"/></div>
                <div>
                    <Button onClick={() => openModal()} type="primary" size="large">Оформить заказ</Button>
                </div>
            </div>
        </section>
    )
}

const productPropTypes = PropTypes.shape({
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
});

BurgerConstructor.propTypes = {
    products: PropTypes.arrayOf(productPropTypes)
};

export default BurgerConstructor;