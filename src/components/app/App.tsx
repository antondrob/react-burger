import React from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [state, setState] = React.useState({
        loading: false,
        error: false,
        products: []
    });
    const [orderOpen, setOrderOpen] = React.useState(false);
    const [ingredientOpen, setIngredientOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);

    const openModal = React.useCallback(
        (el = null) => {
            if (el !== null) {
                setIngredientOpen(true);
                setModalData(el);
            } else {
                setOrderOpen(true);
            }
        },
        []
    );

    const closeModal = React.useCallback(
        () => {
            setIngredientOpen(false);
            setOrderOpen(false);
            setModalData(null);
        },
        []
    );

    React.useEffect(() => {
        const getProductData = async () => {
            setState({...state, loading: true});
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Ответ сети был не ok.');
                }
                const json = await response.json();
                if (json?.success) {
                    setState({loading: false, error: false, products: json.data});
                } else {
                    throw new Error('Не удалось получить товары.');
                }
            } catch (e) {
                setState({...state, loading: false, error: true});
            }
        }
        getProductData();

    }, []);

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27 && (ingredientOpen || orderOpen)) {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [orderOpen, ingredientOpen, closeModal]);

    return (
        <>
            <AppHeader/>
            <div className={AppStyles.container}>
                <h1>Соберите бургер</h1>
                <main className={AppStyles.content}>
                    <BurgerIngredients products={state.products} openModal={openModal}/>
                    <BurgerConstructor products={state.products} openModal={openModal}/>
                </main>
            </div>
            {ingredientOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails details={modalData}/>
                </Modal>
            )}
            {orderOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails orderId="034536"/>
                </Modal>
            )}
        </>
    );
}

export default App;