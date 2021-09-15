import {WS_ALL_ORDERS, TABLE_ORDERS_LIMIT} from '../../services/appVariables';
import styles from './feedStyles.module.css'
import OrdersFeed from "../../components/orders-feed/OrdersFeed";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_START, WS_CONNECTION_FINISH} from "../../services/actions/websocket";

export const FeedPage = () => {
    const {orders, total, totalToday} = useSelector(store => store.websocket);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {
                url: WS_ALL_ORDERS,
                secure: false
            }
        });
        return () => {
            dispatch({
                type: WS_CONNECTION_FINISH,
                payload: 1000
            });
        };
    }, [dispatch]);
    return (
        <div>
            <h1>Лента заказов</h1>
            <main className={styles.content}>
                <section className={styles.ordersFeed}>
                    <OrdersFeed/>
                </section>
                {orders && <>
                    <section className={styles.ordersTotalsSection}>
                        <div className={styles.ordersTable}>
                            <div className={styles.completedOrders}>
                                <h4 className="text text_type_main-medium">Готовы:</h4>
                                <ul className={styles.orderIds}>
                                    {orders.splice(0, TABLE_ORDERS_LIMIT).map(order => {
                                        return order.status === 'done' ?
                                            <li key={order.number}>{order.number}</li> : null
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text text_type_main-medium">В работе:</h4>
                                <ul className={styles.orderIds}>
                                    {orders.splice(0, TABLE_ORDERS_LIMIT).map(order => {
                                        return order.status === 'pending' || order.status === 'created' ?
                                            <li key={order.number}>{order.number}</li> :
                                            null;
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.ordersTotals}>
                            <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
                            <p className="text text_type_digits-large">{total}</p>
                        </div>
                        <div>
                            <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
                            <p className="text text_type_digits-large">{totalToday}</p>
                        </div>
                    </section>
                </>}
            </main>
        </div>

    )
}