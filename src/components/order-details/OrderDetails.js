import React from 'react';
import {Typography, Box} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetailsStyles from './OrderDetailsStyles.module.css';
import successIcon from '../../images/success.gif';
import PropTypes from "prop-types";

function OrderDetails({orderId}) {
    return (
        <div className={OrderDetailsStyles.orderDetails}>
            <div><p className={`${OrderDetailsStyles.orderId} text text_type_digits-large`}>{orderId}</p></div>
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

OrderDetails.propTypes = {
    orderId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default OrderDetails;