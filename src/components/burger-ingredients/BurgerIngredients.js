import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {
    Tab,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";

function BurgerIngredients() {
    const ingredients = useSelector(store => store.ingredients.items);
    const [tabs, setTabs] = useState([
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
    ]);

    const scrollDiv = useRef(null),
        bunHeader = useRef(null),
        mainHeader = useRef(null),
        sauceHeader = useRef(null);

    const switchTab = useCallback((tab) => {
        setTabs([
            ...tabs.map(el => {
                if (el.id === tab) {
                    return {
                        ...el,
                        active: true
                    }
                } else {
                    return {
                        ...el,
                        active: false
                    }
                }
            })
        ]);
    }, [tabs]);

    useEffect(() => {
        const ingredientBlock = scrollDiv.current;
        const scrollHandler = (event) => {
            const scrollBlock = event.target.scrollTop + scrollDiv.current.offsetTop;
            if (scrollBlock - mainHeader.current.offsetTop > 0) {
                switchTab('main');
            } else if (scrollBlock - sauceHeader.current.offsetTop > 0) {
                switchTab('sauce');
            } else {
                switchTab('bun');
            }
        }
        ingredientBlock.addEventListener('scroll', scrollHandler);
        return () => {
            ingredientBlock.removeEventListener('scroll', scrollHandler);
        }
    }, [switchTab]);

    const scrollIngredients = useCallback((tab) => {
        const bunHeaderoffsetTop = bunHeader.current.offsetTop - 10;
        if (tab.id === 'bun') {
            scrollDiv.current.scrollTo(0, 0);
        } else if (tab.id === 'sauce') {
            scrollDiv.current.scrollTo(0, sauceHeader.current.offsetTop - bunHeaderoffsetTop);
        } else {
            scrollDiv.current.scrollTo(0, mainHeader.current.offsetTop - bunHeaderoffsetTop);
        }
    }, []);

    return (
        <section className={BurgerIngredientsStyles.leftSidebar}>
            <div>
                <div style={{display: 'flex'}}>
                    {tabs.map((el, index) => {
                        return (
                            <Tab value={el.name} active={el.active} key={el.id} onClick={() => scrollIngredients(el)}>
                                {el.name}
                            </Tab>
                        )
                    })}
                </div>
                <div ref={scrollDiv} className={BurgerIngredientsStyles.burgerBuilder}>
                    <div>
                        <h2 ref={bunHeader}>Булки</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {ingredients.filter(el => el.type === 'bun').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2 ref={sauceHeader}>Соусы</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {ingredients.filter(el => el.type === 'sauce').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2 ref={mainHeader}>Начинка</h2>
                        <ul className={BurgerIngredientsStyles.list}>
                            {ingredients.filter(el => el.type === 'main').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(BurgerIngredients);