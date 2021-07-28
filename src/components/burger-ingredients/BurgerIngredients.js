import React from 'react';
import PropTypes from 'prop-types';
import {
    Counter,
    Tab,
    CurrencyIcon,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

function BurgerIngredients(props) {
    const [state, setState] = React.useState({
        tabs: [
            {
                id: 'bun',
                name: 'Булки',
                active: true
            },
            {
                id: 'sauce',
                name: 'Соусы',
                active: false
            },
            {
                id: 'main',
                name: 'Начинка',
                active: false
            }
        ],
        addedProducts: {
            "60666c42cc7b410027a1a9b1": 1,
            "60666c42cc7b410027a1a9b8": 1,
            "60666c42cc7b410027a1a9b6": 2
        },
        modal: {
            isOpened: false,
            data: null
        }
    });

    const closeIngredient = React.useCallback(
        () => {
            setState({
                ...state,
                modal: {
                    isOpened: false,
                    data: null
                }
            })
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
                isOpened: true,
                data: el
            }
        });
    }

    return (
        <section className={BurgerIngredientsStyles.leftSidebar}>
            <div>
                <div style={{display: 'flex'}}>
                    {state.tabs.map((el, index) => {
                        return (
                            <Tab value={el.name} active={el.active} key={el.id}>
                                {el.name}
                            </Tab>
                        )
                    })}
                </div>
                <div className={BurgerIngredientsStyles.burgerBuilder}>
                    <div>
                        <h2>Булки</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {props.products.filter(el => el.type === 'bun').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => openIngredient(el)}>
                                        {el._id in state.addedProducts &&
                                        <Counter count={state.addedProducts[el._id]} size="default"/>}
                                        <div className={BurgerIngredientsStyles.listItem}>
                                            <img src={el.image} alt={el.name}/>
                                            <span
                                                className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                <CurrencyIcon
                                                    type="primary"/></span>
                                            <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2>Соусы</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {props.products.filter(el => el.type === 'sauce').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => openIngredient(el)}>
                                        {el._id in state.addedProducts &&
                                        <Counter count={state.addedProducts[el._id]} size="default"/>}
                                        <div className={BurgerIngredientsStyles.listItem}>
                                            <img src={el.image} alt={el.name}/>
                                            <span
                                                className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                <CurrencyIcon
                                                    type="primary"/></span>
                                            <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2>Начинка</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {props.products.filter(el => el.type === 'main').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => openIngredient(el)}>
                                        {el._id in state.addedProducts &&
                                        <Counter count={state.addedProducts[el._id]} size="default"/>}
                                        <div className={BurgerIngredientsStyles.listItem}>
                                            <img src={el.image} alt={el.name}/>
                                            <span
                                                className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                <CurrencyIcon
                                                    type="primary"/></span>
                                            <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {state.modal.isOpened && (
                <Modal header="Детали ингредиента" onClose={closeIngredient}>
                    <IngredientDetails details={state.modal.data}/>
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

BurgerIngredients.propTypes = {
    products: PropTypes.arrayOf(productPropTypes)
};

export default BurgerIngredients;