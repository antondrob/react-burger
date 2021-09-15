import {WS_ALL_ORDERS} from '../../services/appVariables';
import styles from './feedStyles.module.css'
import OrdersFeed from "../../components/orders-feed/OrdersFeed";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {WS_CONNECTION_START, WS_CONNECTION_FINISH} from "../../services/actions/websocket";
import OrdersStat from "../../components/orders-stat/OrdersStat";

export const FeedPage = () => {
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
                <section>
                    <OrdersStat/>
                </section>
            </main>
        </div>

    )
}