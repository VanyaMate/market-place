import React from 'react';
import Logo from "./logo/Logo";
import CatalogueButton from "./catalogue-button/CatalogueButton";
import Row from "../../../_ui/_containers/row/Row";
import MainSearch from "./main-search/MainSearch";
import css from './HeaderMiddle.module.scss';
import ProfileMethods from "./profile-methods/ProfileMethods";

const HeaderMiddle = () => {
    return (
        <Row className={css.container} offset={0}>
            <Logo/>
            <CatalogueButton/>
            <MainSearch/>
            <ProfileMethods/>
        </Row>
    );
};

export default HeaderMiddle;