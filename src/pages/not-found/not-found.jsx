import styles from './notFound.module.css';
import notFoundImage from '../../images/404.gif';

export const NotFoundPage = () => {
    return (
        <div className={styles.content}>
            <p className={`text text_type_main-large ${styles.paragraph}`}>Тут ничего нет...</p>
            <img src={notFoundImage} alt="Page not found"/>
        </div>
    )
}