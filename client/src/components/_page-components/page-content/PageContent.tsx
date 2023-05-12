import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "../../_pages/home/HomePage";
import Page404 from "../../_pages/page404/Page404";
import AuthPage from "../../_pages/auth/AuthPage";
import BasketPage from "../../_pages/basket/BasketPage";
import OrderPage from "../../_pages/order/OrderPage";
import ProductPage from "../../_pages/product/ProductPage";
import ProfilePage from "../../_pages/profile/ProfilePage";
import SearchPage from "../../_pages/search/SearchPage";

const PageContent = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/login'} element={<AuthPage/>}/>
                <Route path={'/basket'} element={<BasketPage/>}/>
                <Route path={'/order'} element={<OrderPage/>}/>
                <Route path={'/product/:id'} element={<ProductPage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/search'} element={<SearchPage/>}/>
                <Route path={'*'} element={<Page404/>}/>
            </Routes>
        </div>
    );
};

export default PageContent;