import React from 'react';
import HeaderTop from "./header-top/HeaderTop";
import HeaderMiddle from "./header-middle/HeaderMiddle";
import HeaderBottom from "./header-bottom/HeaderBottom";

const Header = () => {
    return (
        <div>
            <HeaderTop/>
            <HeaderMiddle/>
            <HeaderBottom/>
        </div>
    );
};

export default Header;