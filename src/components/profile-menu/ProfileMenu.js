import styles from "./ProfileMenuStyles.module.css";
import {Link, NavLink, useHistory} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services/actions/user";

export default function ProfileMenu() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const history = useHistory();

    const logoutClick = async (e) => {
        e.preventDefault();
        await dispatch(logout());
        if (!user.logout.failed) {
            localStorage.removeItem('lastVisitedRoute');
            history.replace({pathname: '/login'});
        }
    };
    return (
        <>
            <ul className={styles.profileMenu}>
                <li className={`pt-3 pb-3`}>
                    <NavLink exact to="/profile"
                             className={`text text_type_main-medium ${styles.profileLink}`}
                             activeClassName={styles.profileLinkActive}>Профиль</NavLink>
                </li>
                <li className={`pt-3 pb-3`}>
                    <NavLink exact to="/profile/orders" className={`text text_type_main-medium ${styles.profileLink}`}
                             activeClassName={styles.profileLinkActive}>История
                        заказов</NavLink>
                </li>
                <li className={`pt-3 pb-3`}>
                    <Link to="#logout" onClick={logoutClick}
                          className={`text text_type_main-medium ${styles.profileLink}`}>Выход</Link>
                </li>
            </ul>
            <p className={`text text_type_main-default ${styles.info}`}>В этом разделе вы можете изменить свои
                персональные данные</p>
        </>
    )
}