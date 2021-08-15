import React from 'react';
import {useSelector} from 'react-redux';
import {Typography, Box} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetailsStyles from './OrderDetailsStyles.module.css';
import successIcon from '../../images/success.gif';

function OrderDetails() {
    const {order} = useSelector(store => store.order.data);

    return (
        <div className={OrderDetailsStyles.orderDetails}>
            <div><p className={`${OrderDetailsStyles.orderId} text text_type_digits-large`}>{order.number}</p></div>
            <div><p className="text text_type_main-medium mb-5 mt-5">идентификатор заказа</p></div>
            <div className={`${OrderDetailsStyles.iconWrapper} mb-5 mt-5`}><img src={successIcon} alt="Success"/></div>
            <div className="mt-5">
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div>
    )
}

export default OrderDetails;