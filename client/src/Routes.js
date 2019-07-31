import Layout from '@/components/Layout/Layout';
// Charts
import ChartsPage from '@/pages/Charts/Charts';
// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import ErrorPage from '@/pages/Error/Error';
// Ui
import IconsPage from '@/pages/Icons/Icons';
import Login from '@/pages/Login/Login';
import Charts from '@/pages/Charts/Flot/charts/BarsChart';
import Register from '@/pages/Register/Register';
import CategoriesCreate from '@/pages/Category/CategoriesCreate';
import Categories from '@/pages/Category/Categories';
// Maps
import GoogleMapPage from '@/pages/Maps/Google';
import NotificationsPage from '@/pages/Notifications/Notifications';
// Tables
import TablesBasicPage from '@/pages/Tables/Basic';
// Core
import TypographyPage from '@/pages/Typography/Typography';
import Vue from 'vue';
import Router from 'vue-router';

// Users
import Users from '@/pages/Users/Users';
import UsersCreate from '@/pages/Users/UsersCreate';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                forVisitors: true,
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                forVisitors: true,
            }
        },
        {
            path: '/app',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    path: 'dashboard',
                    name: 'AnalyticsPage',
                    component: AnalyticsPage,
                    meta: {
                        forAuth: true,
                    }
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users,
                    meta: {
                        forAuth: true,
                    }
                },
                {
                    path: 'users/create',
                    name: 'CreateUsers',
                    component: UsersCreate,
                    meta: {
                        forAuth: true,
                    }
                },
                {
                    path: '/categories',
                    name: 'Categories',
                    component: Categories,
                    meta: {
                        forAuth: true,
                    }
                },
                {
                    path: '/categories/create',
                    name: 'CreateCategory',
                    component: CategoriesCreate,
                },
                {
                    path:'/chart',
                    name: 'Chart',
                    component: Charts
                }
            ],
        },
    ],
});
