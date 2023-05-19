import React from 'react';
import css from './Logo.module.scss';
import DefaultLink from "../../../../_ui/_links/default-link/DefaultLink";

const Logo = () => {
    return (
        <DefaultLink to={'/'} className={css.container}>
            MARKET
        </DefaultLink>
    );
};

export default Logo;