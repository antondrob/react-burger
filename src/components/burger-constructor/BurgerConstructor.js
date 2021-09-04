import React, {useCallback, useMemo} from 'react';
import {
    CurrencyIcon,
    ConstructorElement,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructorStyles.module.css';
import {useSelector, useDispatch} from "react-redux";
import {ADD_TO_BURGER, CLEAR_BURGER, REORDER_BURGER} from "../../services/actions/burgerConstructor";

import {useDrop} from "react-dnd";
import update from 'immutability-helper';
import SortableIngredient from '../sortable-ingredient/SortableIngredient';
import {v4 as uuidv4} from 'uuid';
import {ORDER_URL} from "../../services/apiVariables";
import {checkResponse, getCookie} from "../../services/helperFunctions";
import {useHistory, useLocation} from "react-router-dom";

function BurgerConstructor() {
    const {notBun, bun} = useSelector(store => store.burger);
    const {items} = useSelector(store => store.ingredients);
    const history = useHistory();
    const location = useLocation();
    const orderTotal = useMemo(() => {
        return notBun.reduce(function (acc, obj) {
            let price = obj.price;
            if (obj.type === 'bun') {
                price += obj.price;
            }
            return acc + price;
        }, 0) + (bun ? bun.price * 2 : 0);
    }, [notBun, bun]);

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
                item: items.find(el => el._id === item.itemId),
                uniqueId: item.itemId + uuidv4()
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const borderColor = isHover ? '#e3abff' : 'transparent';

    const createOrder = () => {
        if (!getCookie('refreshToken')) {
            history.push('/login');
            return false;
        } else if (!(notBun && bun)) {
            alert('Choose ingredients!');
            return false;
        }
        fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ingredients": [...notBun, bun]
            })
        })
            .then(checkResponse)
            .then(res => {
                if (res.success) {
                    dispatch({type: CLEAR_BURGER});
                    history.push({
                        pathname: `/profile/orders/${res.order.number}`,
                        state: {
                            background: location,
                            order: res.order
                        }
                    });
                } else {
                    throw new Error(res.message);
                }
            }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <section className={BurgerConstructorStyles.rightSidebar}>
            <div ref={dropTarget} className={BurgerConstructorStyles.cart} style={{borderColor}}>
                {notBun.length > 0 || bun ? (
                    <>
                        <div>
                            {bun && (
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image_mobile}
                                />
                            )}
                        </div>
                        <div className={BurgerConstructorStyles.ingredients}>
                            {notBun.filter(el => el.type !== 'bun').map((card, i) => renderCard(card, i))}
                        </div>
                        <div>
                            {bun && (
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
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
                <div className={BurgerConstructorStyles.total}>{orderTotal} <CurrencyIcon type="primary"/></div>
                <div>
                    <Button onClick={createOrder} type="primary"
                            size="large">Оформить
                        заказ</Button>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;