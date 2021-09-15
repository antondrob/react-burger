import OrdersFeed from "../orders-feed/OrdersFeed";
import styles from './ProfileOrdersStyles.module.css';
import {useEffect} from "react";
import {WS_CONNECTION_FINISH, WS_CONNECTION_START} from "../../services/actions/websocket";
import {WS_USER_ORDERS} from "../../services/appVariables";
import {useDispatch} from "react-redux";
export default function ProfileOrders(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {
                url: WS_USER_ORDERS,
                secure: true
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
        <section className={styles.ordersFeed}>
            <OrdersFeed/>
        </section>
    )
}