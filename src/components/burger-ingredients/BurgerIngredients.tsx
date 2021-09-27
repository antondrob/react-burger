import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import {TPreloadedState} from "../../services/types";

function BurgerIngredients() {
    const {items} = useSelector((store: TPreloadedState) => store.ingredients);
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

    const scrollDiv = useRef<HTMLDivElement>(null),
        bunHeader = useRef<HTMLDivElement>(null),
        mainHeader = useRef<HTMLDivElement>(null),
        sauceHeader = useRef<HTMLDivElement>(null);

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
        const scrollHandler: any = (event: React.UIEvent<HTMLDivElement>) => {
            let scrollBlock = event.currentTarget.scrollTop;
            if (scrollDiv?.current?.offsetTop) {
                scrollBlock += scrollDiv.current.offsetTop;
            }
            if (mainHeader?.current?.offsetTop && scrollBlock - mainHeader.current.offsetTop > 0) {
                switchTab('main');
            } else if (sauceHeader?.current?.offsetTop && scrollBlock - sauceHeader.current.offsetTop > 0) {
                switchTab('sauce');
            } else {
                switchTab('bun');
            }
        }
        ingredientBlock?.addEventListener('scroll', scrollHandler);
        return () => {
            ingredientBlock?.removeEventListener('scroll', scrollHandler);
        }
    }, [switchTab]);

    const scrollIngredients = useCallback((tab) => {
        if (bunHeader?.current?.offsetTop) {
            const bunHeaderoffsetTop = bunHeader?.current?.offsetTop - 10;
            if (tab.id === 'bun') {
                scrollDiv?.current?.scrollTo(0, 0);
            } else if (tab.id === 'sauce' && sauceHeader?.current?.offsetTop) {
                scrollDiv?.current?.scrollTo(0, sauceHeader.current.offsetTop - bunHeaderoffsetTop);
            } else if(mainHeader?.current?.offsetTop) {
                scrollDiv?.current?.scrollTo(0, mainHeader?.current?.offsetTop - bunHeaderoffsetTop);
            }
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
                        <div className={BurgerIngredientsStyles.list}>
                            {items.filter(el => el.type === 'bun').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 ref={sauceHeader}>Соусы</h2>
                        <div className={BurgerIngredientsStyles.list}>
                            {items.filter(el => el.type === 'sauce').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 ref={mainHeader}>Начинка</h2>
                        <div className={BurgerIngredientsStyles.list}>
                            {items.filter(el => el.type === 'main').map((el, index) => {
                                return (
                                    <BurgerIngredient key={el._id} item={el}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(BurgerIngredients);