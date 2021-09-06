import gif from '../../images/loading.gif';
import styles from './LoadingStyles.module.css';
import PropTypes from "prop-types";

const Loading = ({request, fail}) => {
    return (
        <section className={styles.section}>
            {request ? <img className={styles.loadingGif} src={gif} alt="Loading..."/> :
                <p className={styles.error}>Произошла ошибка при попытке получить данные с сервера.</p>
            }
        </section>
    )
}
Loading.propTypes = {
    request: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired
};
export default Loading;