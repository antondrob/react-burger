import gif from '../../images/loading.gif';
import styles from './LoadingStyles.module.css';
import {TLoadingProps} from "../../services/types";

const Loading = ({request, fail}: TLoadingProps) => {
    return (
        <section className={styles.section}>
            {request || !fail ? <img className={styles.loadingGif} src={gif} alt="Loading..."/> :
                <p className={styles.error}>Произошла ошибка при попытке получить данные с сервера.</p>
            }
        </section>
    )
}
export default Loading;