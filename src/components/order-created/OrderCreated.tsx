import React from 'react';
import OrderDetailsStyles from './OrderCreatedStyles.module.css';
import successIcon from '../../images/success.gif';
import {useSelector} from "react-redux";
import {TPreloadedState} from "../../services/types";

export default function OrderCreated(){
    const {data: order} = useSelector((store: TPreloadedState) => store.order);
    return order ?
        <div className={OrderDetailsStyles.orderDetails}>
            <div><p className={`${OrderDetailsStyles.orderId} text text_type_digits-large`}>{order.number}</p></div>
            <div><p className="text text_type_main-medium mb-5 mt-5">идентификатор заказа</p></div>
            <div className={`${OrderDetailsStyles.iconWrapper} mb-5 mt-5`}><img src={successIcon} alt="Success"/></div>
            <div className="mt-5">
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div> : null;
}