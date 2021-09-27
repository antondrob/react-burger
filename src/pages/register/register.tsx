import React, {useCallback, useState} from 'react';
import styles from "./register.module.css";
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {register} from "../../services/actions/user";

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const registerUser = useCallback((e) => {
        e.preventDefault();
        dispatch(register(email, password, name));
    }, [dispatch, email, password, name]);
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <p className={`text text_type_main-medium ${styles.formTitle}`}>Регистрация</p>
                <form className={styles.form} onSubmit={registerUser}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            name={'name'}
                            size={'default'}
                            value={name}
                        />
                    </div>
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
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <div>
                    <p className={`text text_type_main-default ${styles.paragraph}`}>Уже зарегистрированы? <Link
                        className={styles.link} to="/login">Войти</Link></p>
                </div>
            </div>
        </div>
    )
}