import Admin from './pages/Admin';
import { ADMIN_PAGE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './consts/pagePaths';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import Home from './pages/Home';

export const adminRoutes = [
    {
        path: ADMIN_PAGE_ROUTE,
        page: Admin
    },
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        page: Home
    },
    {
        path: SHOP_ROUTE,
        page: Shop
    },
    {
        path: LOGIN_ROUTE,
        page: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        page: Registration
    },
    // {
    //     path: DEVICE_ROUTE + '/:id',

    //     Component: DevicePage
    // },
];
