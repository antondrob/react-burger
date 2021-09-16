import styles from "../profile-form/ProfileFormStyles.module.css";
import OrderDetails from "../order-details/OrderDetails";

export default function ProfileOrder() {
    return (
        <div className={styles.sidesWrapper}>
            <OrderDetails/>
            <div className={styles.leftSide}></div>
        </div>
    )
}