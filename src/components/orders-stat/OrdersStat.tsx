import {useSelector} from "react-redux";
import styles from "./OrdersStatStyles.module.css";
import {TABLE_ORDERS_LIMIT} from '../../services/appVariables';
import {TPreloadedState} from "../../services/types";

export default function OrdersStat() {
    const {orders, total, totalToday} = useSelector((store: TPreloadedState) => store.websocket);
    return (
        orders && <>
            <div className={styles.ordersTable}>
                <div className={styles.completedOrders}>
                    <h4 className="text text_type_main-medium">Готовы:</h4>
                    <ul className={styles.orderIds}>
                        {orders.filter((el, i) => i < TABLE_ORDERS_LIMIT).map(order => {
                            return order.status === 'done' ?
                                <li key={order.number}>{order.number}</li> : null
                        })}
                    </ul>
                </div>
                <div>
                    <h4 className="text text_type_main-medium">В работе:</h4>
                    <ul className={styles.orderIds}>
                        {orders.filter((el, i) => i < TABLE_ORDERS_LIMIT).map(order => {
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
            <div  className={styles.ordersTotals}>
                <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </>

    )
}