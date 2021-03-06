import * as React from 'react';
import { Route, Redirect } from 'react-router';

interface Props {
    component: React.ComponentType<any>,
    path: string
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
                    return <Component {...props} />;
                }
                return <Redirect to="/login" />;
            }}
        />
    );
};

export default PrivateRoute; 