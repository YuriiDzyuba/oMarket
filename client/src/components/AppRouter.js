import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../consts/pagePaths";

const AppRouter = () => {

    return (
        <Switch>
            {authRoutes.map(({path, page}) => (
                <Route key={path} path={path} component={page} exact/>
            ))}
            {publicRoutes.map(({path, page})=>(
                <Route key={path} path={path} component={page} exact/>
            ))}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;
