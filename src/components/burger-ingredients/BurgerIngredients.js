import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
    Counter,
    Tab,
    CurrencyIcon,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';
import {BurgerContext} from '../../services/contexts/BurgerContext';

function BurgerIngredients({openModal}) {
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
        }
    });
    const products = useContext(BurgerContext);

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
                            {products.filter(el => el.type === 'bun').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => {
                                        openModal(el);
                                    }}>
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
                            {products.filter(el => el.type === 'sauce').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => {
                                        openModal(el);
                                    }}>
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
                            {products.filter(el => el.type === 'main').map((el, index) => {
                                return (
                                    <li key={el._id} onClick={(e) => {
                                        openModal(el);
                                    }}>
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
        </section>
    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func
};

export default React.memo(BurgerIngredients);