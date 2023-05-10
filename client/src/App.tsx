import React from 'react';
import css from './App.module.scss';
import Header from "./components/_page-components/header/Header";
import PageContent from "./components/_page-components/page-content/PageContent";
import Footer from "./components/_page-components/footer/Footer";

const App = () => {
    return (
        <div className={css.container}>
            <div className={css.width}>
                <div>
                    <Header/>
                    <PageContent/>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default App;