import {useLocation, useHistory, Route, Switch} from 'react-router-dom';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderCreated from "../order-created/OrderCreated";
import OrderDetails from '../order-details/OrderDetails';
import {
    ForgotPasswordPage,
    HomePage,
    IngredientsPage,
    LoginPage, NotFoundPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
    FeedPage,
    OrderDetailsPage
} from "../../pages";
import ProtectedRoute from "../../hocs/protected-route/ProtectedRoute";
import React from "react";
import {useSelector} from "react-redux";
import {TLocation, TPreloadedState} from "../../services/types";

export default function ModalSwitch() {
    const location = useLocation<TLocation>();
    const history = useHistory();
    const {data: order} = useSelector((store: TPreloadedState) => store.order);
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location?.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/feed" exact>
                    <FeedPage/>
                </Route>
                <Route path="/feed/:id" exact>
                    <OrderDetailsPage/>
                </Route>
                <ProtectedRoute path="/profile/orders/:id" exact>
                    <OrderDetailsPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/login" exact>
                    <LoginPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/register" exact>
                    <RegisterPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/forgot-password" exact>
                    <ForgotPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password" exact>
                    <ResetPasswordPage/>
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact>
                    <IngredientsPage/>
                </Route>
                <ProtectedRoute path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
                <Route>
                    <NotFoundPage/>
                </Route>
            </Switch>

            {background && (
                <Route
                    path="/ingredients/:id"
                    children={
                        <Modal>
                            <IngredientDetails/>
                        </Modal>
                    }
                />
            )}
            {background && (
                <Route
                    path="/feed/:id"
                    children={
                        <Modal>
                            <OrderDetails/>
                        </Modal>
                    }
                />
            )}
            {background && (
                <ProtectedRoute
                    path='/profile/orders/:id'
                    children={
                        <Modal>
                            <OrderDetails/>
                        </Modal>
                    }
                />
            )}
            {order && (
                <Modal>
                    <OrderCreated/>
                </Modal>
            )}
        </>
    );
};