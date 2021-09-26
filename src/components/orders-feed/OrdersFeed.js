import styles from "./OrdersFeedStyles.module.css";
import {Link, useRouteMatch, useLocation} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
import {ORDER_STATUSES} from "../../services/appVariables";
import {generateOrderItems} from '../../services/helperFunctions';
import Loading from "../loading/Loading";

const OrdersFeed = () => {
    const location = useLocation();
    const {path} = useRouteMatch();
    const {orders, wsConnected, error} = useSelector(store => store.websocket);
    const {items, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);
    return (
        orders && items ?
        <ul className={styles.ordersList}>
            {orders && orders.map(order => {
                if (order.ingredients.length < 1 || order.ingredients.some(el => el === null)) {
                    return null;
                }
                const orderItems = generateOrderItems(order.ingredients, items);
                return (
                    <li key={order._id}>
                        <Link className={styles.orderLink}
                              to={{pathname: `${path}/${order.number}`, state: {background: location}}}>
                            <div className={styles.orderTop}>
                                <span className={styles.orderID}>#{order.number}</span>
                                <span
                                    className="text text_type_main-default text_color_inactive">{moment(order.createdAt).locale('ru').calendar()} i-GMT+3</span>
                            </div>
                            {path === '/profile/orders' && <div>
                                <p className={`text text_type_main-default ${styles.orderStatus} ${styles[order.status]}`}>{ORDER_STATUSES[order.status]}</p>
                            </div>}
                            <div className={`text text_type_main-medium ${styles.orderTitle}`}>
                                <h3>{order.name ?? ''}</h3>
                            </div>
                            <div className={styles.orderBottom}>
                                <div className={styles.orderItems}>
                                    {orderItems.keys.map(orderItem => {
                                        if (!orderItem) {
                                            return null;
                                        }
                                        const product = orderItems.metaData[orderItem];
                                        return (
                                            <div key={order._id + product.id} className={styles.orderItem}>
                                                <img src={product.image} alt={product.name}/>
                                                {product.amount > 1 && <span
                                                    className="text text_type_main-default">+{product.amount}</span>}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={styles.orderTotal}><span
                                    className={styles.orderCost}>{orderItems.orderTotal}</span> <CurrencyIcon/></div>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul> :
            <Loading fail={ingredientsFailed || error ? true : false} request={ingredientsRequest || !wsConnected} />
    )
}
export default OrdersFeed;