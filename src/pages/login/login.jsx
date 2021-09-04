import React, {useState} from 'react';
import styles from "./login.module.css";
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useHistory} from 'react-router-dom';
import {login} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

export const LoginPage = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
            await dispatch(login(email, password));
            if (!user.login.failed && lastVisitedRoute) {
                localStorage.removeItem('lastVisitedRoute');
                history.replace({pathname: lastVisitedRoute});
            }
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <p className={`text text_type_main-medium ${styles.formTitle}`}>Вход</p>
                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            name={'email'}
                            size={'default'}
                            value={email}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <PasswordInput
                            name={'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Вход
                        </Button>
                    </div>
                </form>
                <div>
                    <p className={`text text_type_main-default ${styles.paragraph}`}>Вы — новый пользователь? <Link
                        className={styles.link} to="/register">Зарегистрироваться</Link></p>
                    <p className={`text text_type_main-default ${styles.paragraph}`}>Забыли пароль? <Link
                        className={styles.link} to="/forgot-password">Восстановить пароль</Link></p>
                </div>
            </div>
        </div>
    )
}