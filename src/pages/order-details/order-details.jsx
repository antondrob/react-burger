import styles from './orderDetailsStyles.module.css';
import OrderDetails from "../../components/order-details/OrderDetails";

export const OrderDetailsPage = () => {
    return (
        <main className={styles.orderDetailsPage}>
            <section>
                <OrderDetails/>
            </section>
        </main>
    )
}