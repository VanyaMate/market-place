import React from 'react';
import css from './App.module.scss';
import Header from "./components/_page-components/header/Header";
import PageContent from "./components/_page-components/page-content/PageContent";
import Footer from "./components/_page-components/footer/Footer";
import {useUpdateUserByToken} from "./hooks/useUpdateUserByToken.hook";
import Notifications from "./components/_page-components/notifications/Notifications";

const App = () => {
    useUpdateUserByToken();

    return (
        <div className={css.container}>
            <div className={css.width}>
                <div>
                    <Header/>
                    <PageContent/>
                </div>
                <Footer/>
            </div>
            <Notifications/>
        </div>
    );
};

export default App;