import React from 'react';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import {Link, NavLink} from 'react-router-dom';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <nav className={styles.menuItems}>
                    <div className={styles.menuItemSection}>
                        <NavLink exact to="/" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                            <BurgerIcon type="secondary"/>
                            <span className="ml-3">Конструктор</span>
                        </NavLink>
                        <NavLink to="/feed" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                            <ListIcon type="secondary"/>
                            <span className="ml-3">Лента заказов</span>
                        </NavLink>
                    </div>
                    <div className={styles.logoSection}>
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <div className={styles.lkSection}>
                        <NavLink to="/profile" className={styles.menuLkItem} activeClassName={styles.menuItemActive}>
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