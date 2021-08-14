import React, {useCallback} from 'react';
import {
    CurrencyIcon,
    ConstructorElement,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructorStyles.module.css';
import {useSelector, useDispatch} from "react-redux";
import {ADD_TO_BURGER, createOrder, REORDER_BURGER} from "../../services/actions";
import {useDrop} from "react-dnd";
import update from 'immutability-helper';
import SortableIngredient from '../sortable-ingredient/SortableIngredient';

function BurgerConstructor() {
    const {notBun, bun} = useSelector(store => store.burger);
    const ingredients = useSelector(store => store.ingredients.items);
    const orderTotal = notBun.reduce(function (acc, obj) {
        let price = obj.price;
        if (obj.type === 'bun') {
            price += obj.price;
        }
        return acc + price;
    }, 0) + (bun.price ?? 0 * 2);
    const dispatch = useDispatch();
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = notBun[dragIndex];
        dispatch({
            type: REORDER_BURGER, payload: update(notBun, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        });
    }, [notBun, dispatch]);
    const renderCard = (card, index) => {
        return (
            <SortableIngredient
                key={card.uniqueId}
                index={index}
                id={card.uniqueId}
                price={card.price}
                name={card.name}
                image_mobile={card.image_mobile}
                moveCard={moveCard}
            />
        );
    };
    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({
                type: ADD_TO_BURGER,
                item: ingredients.find(el => el._id === item.itemId)
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const borderColor = isHover ? '#e3abff' : 'transparent';

    return (
        <section className={BurgerConstructorStyles.rightSidebar}>
            <div ref={dropTarget} className={BurgerConstructorStyles.cart} style={{borderColor}}>
                {notBun.length > 0 || (bun && Object.keys(bun).length !== 0) ? (
                    <>
                        <div>
                            {bun && Object.keys(bun).length !== 0 && (
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price / 100}
                                    thumbnail={bun.image_mobile}
                                />
                            )}
                        </div>
                        <div className={BurgerConstructorStyles.ingredients}>
                            {notBun.filter(el => el.type !== 'bun').map((card, i) => renderCard(card, i))}
                        </div>
                        <div>
                            {bun && Object.keys(bun).length !== 0 && (
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price / 100}
                                    thumbnail={bun.image_mobile}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <div className={BurgerConstructorStyles.cartEmpty}>
                        <p>Ты не ты, когда голоден...</p>
                    </div>
                )}
            </div>
            <div className={BurgerConstructorStyles.checkout}>
                <div className={BurgerConstructorStyles.total}>{orderTotal / 100} <CurrencyIcon type="primary"/></div>
                <div>
                    <Button onClick={() => dispatch(createOrder(bun, notBun))} type="primary" size="large">Оформить
                        заказ</Button>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;