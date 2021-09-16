import styles from "./ProfileFormStyles.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUser, updateUser} from "../../services/actions/user";

export default function ProfileForm() {
    const user = useSelector(store => store.user);
    const history = useHistory();
    const initialFormState = {
        name: user.data?.name ?? '',
        email: user.data?.email ?? '',
        password: user.data?.password ?? ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            await dispatch(getUser(user?.password));
            if (user.getUserRequest.failed) {
                history.replace({pathname: '/login'});
            }
        }
        if (!user.data) {
            fetchUserData();
        }
    }, [dispatch, history, user.data, user?.password, user.getUserRequest.failed]);

    useEffect(() => {
        setFormData({
            name: user.data?.name ?? '',
            email: user.data?.email ?? '',
            password: user.data?.password ?? ''
        });
    }, [user.data?.name, user.data?.email, user.data?.password]);


    const profileOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const updateUserHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(formData));
    }

    const cancelChanges = (e) => {
        e.preventDefault();
        setFormData(initialFormState);
    }
    return (
        <div className={styles.sidesWrapper}>
            <div className={styles.leftSide}>
                <form onSubmit={updateUserHandler}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={profileOnChange}
                            name={'name'}
                            size={'default'}
                            value={formData.name}
                            icon={'EditIcon'}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={profileOnChange}
                            name={'email'}
                            size={'default'}
                            value={formData.email}
                            icon={'EditIcon'}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            onChange={profileOnChange}
                            name={'password'}
                            size={'default'}
                            value={formData.password}
                            icon={'EditIcon'}
                        />
                    </div>
                    <div className={styles.submitWrapper}>
                        <a href="#cancel" className={styles.link} onClick={cancelChanges}>Отмена</a>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
            <div className={styles.rightSide}></div>
        </div>
    )
}