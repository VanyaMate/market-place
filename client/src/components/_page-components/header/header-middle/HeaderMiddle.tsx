import React from 'react';
import Logo from "./logo/Logo";
import CatalogueButton from "./catalogue-button/CatalogueButton";
import Row from "../../../_ui/_containers/Row";

const HeaderMiddle = () => {
    return (
        <Row>
            <Logo/>
            <CatalogueButton/>
        </Row>
    );
};

export default HeaderMiddle;