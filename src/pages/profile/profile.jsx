import React from "react";
import styles from './profile.module.css';
import ProfileMenu from "../../components/profile-menu/ProfileMenu";
import ProfileForm from "../../components/profile-form/ProfileForm";
import {Route, Switch, Redirect} from "react-router-dom";
import ProfileOrders from "../../components/profile-orders/ProfileOrders";
import ProfileOrder from "../../components/profile-order/ProfileOrder";


export const ProfilePage = () => {
    return (
        <div className={styles.content}>
            <div className={`${styles.column} ${styles.sidebar}`}>
                <ProfileMenu />
            </div>
            <div className={`${styles.column} ${styles.centerBlock}`}>
                <Switch>
                    <Route path="/profile" exact>
                        <ProfileForm />
                    </Route>
                    <Route path="/profile/orders" exact>
                        <ProfileOrders />
                    </Route>
                    <Route path="/profile/orders/:id" exact>
                        <ProfileOrder />
                    </Route>
                    <Route>
                        <Redirect to={{pathname: '/'}}/>
                    </Route>
                </Switch>

            </div>
            <div className={`${styles.column} ${styles.sidebar}`}></div>
        </div>
    )
}