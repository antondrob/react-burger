import {useLocation, useHistory, Route, Switch} from 'react-router-dom';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import {
    ForgotPasswordPage,
    HomePage,
    IngredientsPage,
    LoginPage, NotFoundPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import React from "react";

export default function ModalSwitch() {
    const location = useLocation();
    const history = useHistory();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
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
                            <IngredientDetails />
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
        </>
    );
};