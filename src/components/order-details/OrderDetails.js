import React, {useState, useEffect} from "react";
import styles from "./OrderDetailsStyles.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {ORDER_URL} from '../../services/appVariables';
import {checkResponse, generateOrderItems} from '../../services/helperFunctions';
import moment from 'moment';
import 'moment/locale/ru';
import {ORDER_STATUSES} from "../../services/appVariables";
import {useSelector} from "react-redux";
import Loading from "../loading/Loading";

const OrderDetails = () => {
    const {id} = useParams();
    const {items} = useSelector(store => store.ingredients);
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState(null);
    useEffect(() => {
        if (!order) {
            fetch(`${ORDER_URL}/${id}`)
                .then(checkResponse)
                .then(res => {
                    if (res.success) {
                        setOrder(res.orders[0]);
                    } else {
                        throw new Error(res.message);
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        } else if (order && items.length > 0) {
            setOrderItems(generateOrderItems(order.ingredients, items));
        }
    }, [items, order, id]);
    return (
        order && orderItems ?
            <div className={styles.orderDetails}>
                <p className={styles.orderId}>#{order.number}</p>
                <h3 className={`text text_type_main-medium ${styles.itemName}`}>{order.name}</h3>
                <p className={`text text_type_main-default ${styles.orderStatus}`}>{ORDER_STATUSES[order.status]}</p>
                <p className={`text text_type_main-medium ${styles.orderСomposition}`}>Состав:</p>
                <ul className={styles.orderItems}>
                    {orderItems.keys.map(orderItem => {
                        const product = orderItems.metaData[orderItem];
                        return (
                            <li key={product.id} className={styles.orderItem}>
                                <div className={styles.orderItemLeft}>
                                    <div className={styles.orderThumbnail}>
                                        <img src={product.image} alt={product.name}/>
                                    </div>
                                    <p className="text text_type_main-default">{product.name}</p>
                                </div>
                                <p className={styles.orderTotal}>
                                    <span className={styles.orderCost}>{product.amount} x {product.price}</span>
                                    <CurrencyIcon/>
                                </p>
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.orderFooter}>
                    <span
                        className="text text_type_main-default text_color_inactive">{moment(order.createdAt).locale('ru').calendar()}</span>
                    <p className={styles.orderTotal}>
                        <span className={styles.orderCost}>{orderItems.orderTotal}</span>
                        <CurrencyIcon/>
                    </p>
                </div>
            </div> :
            <Loading fail={false} request={true}/>
    )
}
export default OrderDetails;