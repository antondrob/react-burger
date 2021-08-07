import React, {useState, useEffect, useReducer, useCallback} from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import AppStyles from './App.module.css';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {constructorContext} from '../../contexts/constructorContext';
import {constructorReducer} from '../../reducers/constructorReducer';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';
const placeOrderUrl = 'https://norma.nomoreparties.space/api/orders';

const initialConstructorState = {
    items: [
        {
            "_id": "60d3b41abdacab0026a733c7",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v": 0
        },
        {
            "_id": "60d3b41abdacab0026a733c8",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
        }, {
            "_id": "60d3b41abdacab0026a733c9",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        }, {
            "_id": "60d3b41abdacab0026a733ca",
            "name": "Говяжий метеорит (отбивная)",
            "type": "main",
            "proteins": 800,
            "fat": 800,
            "carbohydrates": 300,
            "calories": 2674,
            "price": 3000,
            "image": "https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v": 0
        },
        {
            "_id": "60d3b41abdacab0026a733c8",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
        }, {
            "_id": "60d3b41abdacab0026a733c9",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        }, {
            "_id": "60d3b41abdacab0026a733ca",
            "name": "Говяжий метеорит (отбивная)",
            "type": "main",
            "proteins": 800,
            "fat": 800,
            "carbohydrates": 300,
            "calories": 2674,
            "price": 3000,
            "image": "https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v": 0
        }
    ]
}

function App() {
    const [state, setState] = useState({
        loading: false,
        error: false,
        products: []
    });
    const [orderOpen, setOrderOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [ingredientOpen, setIngredientOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [currentConstructor, dispatchConstructor] = useReducer(constructorReducer, initialConstructorState);

    const openModal = useCallback(
        async (el = null) => {
            if (el !== null) {
                setIngredientOpen(true);
                setModalData(el);
            } else {
                try {
                    const response = await fetch(placeOrderUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "ingredients": currentConstructor.items.map(item => item._id)
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Ответ сети был не ok.');
                    }
                    const json = await response.json();
                    if (json?.success) {
                        setOrderId(json.order.number);
                        setOrderOpen(true);
                    } else {
                        throw new Error('Не удалось получить товары.');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        [currentConstructor.items]
    );

    const closeModal = useCallback(
        () => {
            setIngredientOpen(false);
            setOrderOpen(false);
            setModalData(null);
        },
        []
    );

    useEffect(() => {
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

    useEffect(() => {
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
                    <constructorContext.Provider value={{currentConstructor, dispatchConstructor}}>
                        <BurgerIngredients products={state.products} openModal={openModal}/>
                        <BurgerConstructor products={state.products} openModal={openModal}/>
                    </constructorContext.Provider>
                </main>
            </div>
            {ingredientOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails details={modalData}/>
                </Modal>
            )}
            {orderOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails orderId={orderId} />
                </Modal>
            )}
        </>
    );
}

export default App;