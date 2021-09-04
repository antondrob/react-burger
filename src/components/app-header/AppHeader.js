import React, {useState, useEffect} from 'react';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import {Link, NavLink} from 'react-router-dom';
import {getCookie} from "../../services/helperFunctions";
import {useSelector} from "react-redux";

function AppHeader() {
    const [refreshToken, setRefreshToken] = useState(getCookie('refreshToken'));
    const user = useSelector(store => store.user.data);
    useEffect(() => {
        setRefreshToken(getCookie('refreshToken'));
    }, [user]);
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <nav className={styles.menuItems}>
                    <div className={styles.menuItemSection}>
                        <NavLink exact to="/" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                            <BurgerIcon type="secondary"/>
                            <span className="ml-3">Конструктор</span>
                        </NavLink>
                        <a href="/" className={styles.menuItem}>
                            <ListIcon type="secondary"/>
                            <span className="ml-3">Лента заказов</span>
                        </a>
                    </div>
                    <div className={styles.logoSection}>
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <div className={styles.lkSection}>
                        <NavLink to={refreshToken ? '/profile' : '/login'} className={styles.menuLkItem} activeClassName={styles.menuItemActive}>
                            <ProfileIcon type="secondary"/>
                            <span className="ml-3">Личный кабинет</span>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;