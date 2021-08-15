import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { BurgerContext } from '../../services/contexts/BurgerContext';
import { API_URL, PLACE_ORDER_URL } from '../../services/apiVariables';
function App() {
    const [state, setState] = useState({
        loading: false,
        error: false,
        products: []
    });
    // const ingredients = useSelector(store => store.ingredients);
    const [orderOpen, setOrderOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [ingredientOpen, setIngredientOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const openModal = useCallback(async (el = null) => {
        if (el !== null) {
            setIngredientOpen(true);
            setModalData(el);
        }
        else {
            try {
                const response = await fetch(PLACE_ORDER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "ingredients": state.products.map(item => item._id)
                    })
                });
                if (!response.ok) {
                    throw new Error('Ответ сети был не ok.');
                }
                const json = await response.json();
                if (json?.success) {
                    setOrderId(json.order.number);
                    setOrderOpen(true);
                }
                else {
                    throw new Error('Не удалось получить товары.');
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [state.products]);
    const closeModal = useCallback(() => {
        setIngredientOpen(false);
        setOrderOpen(false);
        setModalData(null);
    }, []);
    useEffect(() => {
        const getProductData = async () => {
            setState({ ...state, loading: true });
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Ответ сети был не ok.');
                }
                const json = await response.json();
                if (json?.success) {
                    setState({ loading: false, error: false, products: json.data });
                }
                else {
                    throw new Error('Не удалось получить товары.');
                }
            }
            catch (e) {
                setState({ ...state, loading: false, error: true });
            }
        };
        getProductData();
    }, []);
    return (<>
            <BurgerContext.Provider value={state.products}>
                <AppHeader />
                <div className={AppStyles.container}>
                    <h1>Соберите бургер</h1>
                    <main className={AppStyles.content}>
                        <BurgerIngredients openModal={openModal}/>
                        <BurgerConstructor openModal={openModal}/>
                    </main>
                </div>
                {ingredientOpen && (<Modal onClose={closeModal}>
                        <IngredientDetails details={modalData}/>
                    </Modal>)}
                {orderOpen && (<Modal onClose={closeModal}>
                        <OrderDetails orderId={orderId}/>
                    </Modal>)}
            </BurgerContext.Provider>
        </>);
}
export default App;
