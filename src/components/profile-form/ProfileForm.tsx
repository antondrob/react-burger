import styles from "./ProfileFormStyles.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUser, updateUser} from "../../services/actions/user";
import {TPreloadedState} from "../../services/types";

export default function ProfileForm() {
    const {data: user, getUserRequest} = useSelector((store: TPreloadedState) => store.user);
    const history = useHistory();
    const initialFormState = {
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: user?.password ?? ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            await dispatch(getUser(user?.password));
            if (getUserRequest.failed) {
                history.replace({pathname: '/login'});
            }
        }
        if (user === null) {
            fetchUserData();
        }
    }, [dispatch, history, user, user?.password, getUserRequest.failed]);

    useEffect(() => {
        setFormData({
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: user?.password ?? ''
        });
    }, [user?.name, user?.email, user?.password]);


    const profileOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const updateUserHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUser(formData));
    }

    const cancelChanges = (e: React.SyntheticEvent) => {
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
                            placeholder={'??????'}
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
                            placeholder={'????????????'}
                            onChange={profileOnChange}
                            name={'password'}
                            size={'default'}
                            value={formData.password}
                            icon={'EditIcon'}
                        />
                    </div>
                    <div className={styles.submitWrapper}>
                        <a href="#cancel" className={styles.link} onClick={cancelChanges}>????????????</a>
                        <Button type="primary" size="medium">
                            ??????????????????
                        </Button>
                    </div>
                </form>
            </div>
            <div className={styles.rightSide}></div>
        </div>
    )
}