import React, {useCallback, useState} from 'react';
import styles from "./reset-password.module.css";
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import {resetPassword} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {TPreloadedState} from "../../services/types";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((store: TPreloadedState) => store.user);
    const formSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        if (code && password) {
            dispatch(resetPassword(password, code));
        }
    }, [password, code, dispatch]);

    return (
        user.resetPassword.success ? <Redirect to={{pathname: '/login'}}/> :
            <div className={styles.loginWrapper}>
                <div className={styles.loginContent}>
                    <p className={`text text_type_main-medium ${styles.formTitle}`}>Восстановление пароля</p>
                    <form onSubmit={formSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <PasswordInput
                                name={'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <Input
                                type={'text'}
                                placeholder={'Введите код из письма'}
                                onChange={e => setCode(e.target.value)}
                                name={'code'}
                                size={'default'}
                                value={code}
                            />
                        </div>
                        <div className={styles.submitWrapper}>
                            <Button type="primary" size="medium">
                                Сохранить
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