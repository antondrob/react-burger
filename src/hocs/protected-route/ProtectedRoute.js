import {useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import {getCookie} from "../../services/helperFunctions";

export default function ProtectedRoute({children, ...rest}) {
    const user = useSelector(store => store.user);
    const location = useLocation();
    const refreshToken = getCookie('refreshToken');
    switch (rest.path) {
        case '/profile':
        case '/profile/orders':
        case '/profile/orders/:id':
            return (
                <Route
                    {...rest}
                    render={({location}) => refreshToken ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {from: location}
                            }}
                        />
                    )}
                />
            )
        case '/login':
            if (refreshToken) {
                const { from } = location.state || { from: { pathname: '/' } };
                return (
                    <Redirect
                        to={from}
                    />
                );
            }
            return <Route {...rest}>{children}</Route>
        case '/register':
            return !refreshToken ? <Route {...rest}>{children}</Route> : <Redirect to={{pathname: '/profile'}}/>
        case '/forgot-password':
            return refreshToken ? <Redirect to={{pathname: '/profile'}}/> :
                user.forgotPassword.success ? <Redirect to={{pathname: '/reset-password'}}/> :
                    <Route {...rest}>{children}</Route>
        case '/reset-password':
            return refreshToken ? <Redirect to={{pathname: '/profile'}}/> :
                !user.forgotPassword.success ? <Redirect to={{pathname: '/forgot-password'}}/> :
                    user.resetPassword.success ? <Redirect to={{pathname: '/login'}}/> :
                        <Route {...rest}>{children}</Route>
        default:
            return <Route {...rest}>{children}</Route>
    }
}