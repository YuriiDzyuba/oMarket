import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../consts/pagePaths';

const AppRouter = () => {

    const currentUser = useSelector((state) => state.user);

    return (
        <Switch>
            {currentUser.role === 'user' && adminRoutes.map(({ path, page }) => (
                <Route key={path} path={path} component={page} exact/>
            ))}
            {publicRoutes.map(({ path, page }) => (
                <Route key={path} path={path} component={page} exact/>
            ))}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;
