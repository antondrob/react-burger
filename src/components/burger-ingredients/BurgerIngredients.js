import React from 'react';
import {
    Counter,
    Tab,
    CurrencyIcon,
    DragIcon,
    ConstructorElement,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';

// Images
import bun01 from '../../images/bun-01.png';
import bun02 from '../../images/bun-02.png';
import sauce01 from '../../images/sauce-01.png';
import sauce02 from '../../images/sauce-02.png';
import sauce03 from '../../images/sauce-03.png';
import sauce04 from '../../images/sauce-04.png';
import meat02 from '../../images/meat-02.png';
import sp1 from '../../images/sp-1.png';
import mineralRings from '../../images/mineral-rings.png';

// API Data
import Data from '../../utils/data';

class BurgerIngredients extends React.Component {
    state = {
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
    };

    render() {
        return (
            <section className={BurgerIngredientsStyles.leftSidebar}>
                <div>
                    <div style={{display: 'flex'}}>
                        {this.state.tabs.map((el, index) => {
                            return (
                                <Tab value={el.name} active={el.active} key={index}>
                                    {el.name}
                                </Tab>
                            )
                        })}
                    </div>
                    <div className={BurgerIngredientsStyles.burgerBuilder}>
                        <div>
                            <h2>Булки</h2>
                            <ul className={BurgerIngredientsStyles.list}>
                                {Data.filter(el => el.type === 'bun').map((el, index) => {
                                    return (
                                        <li key={index}>
                                            {el._id in this.state.addedProducts && <span
                                                className={BurgerIngredientsStyles.notification}>{this.state.addedProducts[el._id]}</span>}
                                            <a href="#" className={BurgerIngredientsStyles.listItem}>
                                                <img src={el.image}/>
                                                <span
                                                    className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                    <CurrencyIcon
                                                        type="primary"/></span>
                                                <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <h2>Соусы</h2>
                            <ul className={BurgerIngredientsStyles.list}>
                                {Data.filter(el => el.type === 'sauce').map((el, index) => {
                                    return (
                                        <li key={index}>
                                            {el._id in this.state.addedProducts && <span
                                                className={BurgerIngredientsStyles.notification}>{this.state.addedProducts[el._id]}</span>}
                                            <a href="#" className={BurgerIngredientsStyles.listItem}>
                                                <img src={el.image}/>
                                                <span
                                                    className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                    <CurrencyIcon
                                                        type="primary"/></span>
                                                <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <h2>Начинка</h2>
                            <ul className={BurgerIngredientsStyles.list}>
                                {Data.filter(el => el.type === 'main').map((el, index) => {
                                    return (
                                        <li key={index}>
                                            {el._id in this.state.addedProducts && <span
                                                className={BurgerIngredientsStyles.notification}>{this.state.addedProducts[el._id]}</span>}
                                            <a href="#" className={BurgerIngredientsStyles.listItem}>
                                                <img src={el.image}/>
                                                <span
                                                    className={BurgerIngredientsStyles.listItemPrice}>{el.price / 100}
                                                    <CurrencyIcon
                                                        type="primary"/></span>
                                                <h3 className={BurgerIngredientsStyles.listItemTitle}>{el.name}</h3>
                                            </a>
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
}

export default BurgerIngredients;