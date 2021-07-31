import React from 'react';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.menuItems}>
                <div className={headerStyles.menuItemSection}>
                    <a href="/" className={headerStyles.menuItemActive}>
                        <BurgerIcon type="primary"/>
                        <span className="ml-3">Конструктор</span>
                    </a>
                    <a href="/" className={headerStyles.menuItem}>
                        <ListIcon type="secondary"/>
                        <span className="ml-3">Лента заказов</span>
                    </a>
                </div>
                <div className={headerStyles.logoSection}>
                    <a href="/">
                        <Logo/>
                    </a>
                </div>
                <div className={headerStyles.lkSection}>
                    <a href="/" className={headerStyles.menuLkItem}>
                        <ProfileIcon type="secondary"/>
                        <span className="ml-3">Личный кабинет</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;