import React from 'react';
import {
    DragIcon,
    CurrencyIcon,
    ConstructorElement,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructorStyles.module.css';
import bun02 from "../../images/bun-02.png";
import sauce03 from "../../images/sauce-03.png";
import meat02 from "../../images/meat-02.png";
import sp1 from "../../images/sp-1.png";
import mineralRings from "../../images/mineral-rings.png";
import PropTypes from "prop-types";

// Modal
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';

function BurgerConstructor() {
    const [state, setState] = React.useState({
        modal: {
            isOpened: false
        }
    });

    const closeIngredient = React.useCallback(
        () => {
            setState({
                ...state,
                modal: {
                    isOpened: false
                }
            });
        },
        [state]
    );

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27 && state.modal.isOpened) {
                closeIngredient();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [state.modal.isOpened, closeIngredient]);

    const openIngredient = (el) => {
        setState({
            ...state,
            modal: {
                isOpened: true
            }
        });
    }

    return (
        <section className={BurgerConstructorStyles.rightSidebar}>
            <div className={BurgerConstructorStyles.cart}>
                <div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bun02}
                    />
                </div>
                <div className={BurgerConstructorStyles.ingredients}>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Соус традиционный галактический"
                            price={30}
                            thumbnail={sauce03}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={300}
                            thumbnail={meat02}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail={sp1}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail={sp1}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail={sp1}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail={mineralRings}
                        />
                    </div>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail={mineralRings}
                        />
                    </div>
                </div>
                <div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bun02}
                    />
                </div>
            </div>
            <div className={BurgerConstructorStyles.checkout}>
                <div className={BurgerConstructorStyles.total}>610 <CurrencyIcon type="primary"/></div>
                <div>
                    <Button onClick={openIngredient} type="primary" size="large">Оформить заказ</Button>
                </div>
            </div>
            {state.modal.isOpened && (
                <Modal onClose={closeIngredient}>
                    <OrderDetails orderId="034536"/>
                </Modal>
            )}
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