import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "../../_pages/home/HomePage";
import Page404 from "../../_pages/page404/Page404";
import AuthPage from "../../_pages/auth/AuthPage";
import BasketPage from "../../_pages/basket/BasketPage";
import OrderPage from "../../_pages/order/OrderPage";
import ProductPage from "../../_pages/product/ProductPage";
import ProfilePage from "../../_pages/profile/ProfilePage";
import CataloguePage from "../../_pages/catalogue/CataloguePage";
import css from './PageContent.module.scss';
import {
    ROUTE_CART, ROUTE_CATALOGUE,
    ROUTE_HOME,
    ROUTE_LOGIN, ROUTE_MY_COMPANY,
    ROUTE_ORDER,
    ROUTE_PRODUCT_ID,
    ROUTE_PROFILE
} from "../../../cfg/links.config";
import MyCompanyPage from "../../_pages/my-company/MyCompanyPage";

const PageContent = () => {
    return (
        <div className={css.container}>
            <Routes>
                <Route path={ROUTE_HOME} element={<HomePage/>}/>
                <Route path={ROUTE_LOGIN} element={<AuthPage/>}/>
                <Route path={ROUTE_CART} element={<BasketPage/>}/>
                <Route path={ROUTE_ORDER} element={<OrderPage/>}/>
                <Route path={ROUTE_PRODUCT_ID} element={<ProductPage/>}/>
                <Route path={ROUTE_PROFILE} element={<ProfilePage/>}/>
                <Route path={ROUTE_CATALOGUE} element={<CataloguePage/>}/>
                <Route path={ROUTE_MY_COMPANY} element={<MyCompanyPage/>}/>
                <Route path={'*'} element={<Page404/>}/>
            </Routes>
        </div>
    );
};

export default PageContent;