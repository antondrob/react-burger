import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    Tab,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './BurgerIngredientsStyles.module.css';
import {SWITCH_INGREDIENT_TAB} from '../../services/actions';
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";

function BurgerIngredients() {
    const ingredients = useSelector(store => store.ingredients.items);
    const tabs = useSelector(store => store.tabs);

    const dispatch = useDispatch();

    const scrollDiv = useRef(null),
        bunHeader = useRef(null),
        mainHeader = useRef(null),
        sauceHeader = useRef(null);

    useEffect(() => {
        const ingredientBlock = scrollDiv.current;
        const scrollHandler = (event) => {
            const scrollBlock = event.target.scrollTop + scrollDiv.current.offsetTop;
            if (scrollBlock - mainHeader.current.offsetTop > 0) {
                dispatch({type: SWITCH_INGREDIENT_TAB, id: 'main'});
            } else if (scrollBlock - sauceHeader.current.offsetTop > 0) {
                dispatch({type: SWITCH_INGREDIENT_TAB, id: 'sauce'});
            } else {
                dispatch({type: SWITCH_INGREDIENT_TAB, id: 'bun'});
            }
        }
        ingredientBlock.addEventListener('scroll', scrollHandler);
        return () => {
            ingredientBlock.removeEventListener('scroll', scrollHandler);
        }
    }, [dispatch]);

    return (
        <section className={BurgerIngredientsStyles.leftSidebar}>
            <div>
                <div style={{display: 'flex'}}>
                    {tabs.map((el, index) => {
                        return (
                            <Tab value={el.name} active={el.active} key={el.id}>
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