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
        products: [],
        modal: {
            isOrderOpen: false,
            isIngredientOpen: false,
            data: null
        }
    });

    const openModal = (el = null) => {
        if (el !== null) {
            setState({
                ...state,
                modal: {
                    ...state.modal,
                    isIngredientOpen: true,
                    data: el
                }
            });
        } else {
            setState({
                ...state,
                modal: {
                    ...state.modal,
                    isOrderOpen: true
                }
            });
        }
    }

    const closeModal = React.useCallback(
        () => {
            setState({
                ...state,
                modal: {
                    isOrderOpen: false,
                    isIngredientOpen: false,
                    data: null
                }
            });
        },
        [state]
    );

    React.useEffect(() => {
        setState({...state, loading: true});
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                if (json?.success) {
                    setState({...state, loading: false, error: false, products: json.data});
                } else {
                    setState({...state, loading: false, error: true});
                }
            })
            .catch((error) => {
                setState({...state, loading: false, error: true});
            });
    }, []);

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27 && (state.modal.isIngredientOpen || state.modal.isOrderOpen)) {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [state, closeModal]);

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
            {state.modal.isIngredientOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails details={state.modal.data}/>
                </Modal>
            )}
            {state.modal.isOrderOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails orderId="034536"/>
                </Modal>
            )}
        </>
    );
}

export default App;