import React, {useState, useCallback} from 'react';
import styles from "./forgotPassword.module.css";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {forgotPassword} from '../../services/actions/user';
import {useDispatch} from "react-redux";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const formSubmit = useCallback((e) => {
        e.preventDefault();
        if (email) {
            dispatch(forgotPassword(email));
        }
    }, [dispatch, email]);

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <p className={`text text_type_main-medium ${styles.formTitle}`}>Восстановление пароля</p>
                <form onSubmit={formSubmit} className={styles.form}>
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
                    <div className={styles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div>
                    <p className={`text text_type_main-default ${styles.paragraph}`}>Вспомнили пароль? <Link
                        className={styles.link} to="/login">Войти</Link></p>
                </div>
            </div>
        </div>
    )
}