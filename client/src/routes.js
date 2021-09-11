import Admin from "./pages/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./consts/pagePaths";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        page: Admin
    },
]

export const publicRoutes = [
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
        page: Auth
    },
    // {
    //     path: DEVICE_ROUTE + '/:id',
    //     Component: DevicePage
    // },
]
