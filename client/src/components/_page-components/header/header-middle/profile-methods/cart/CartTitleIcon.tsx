import React from 'react';
import ContainedPopup from "../../../../../_ui/_popups/contained-popup/ContainedPopup";
import TitleIcon from "../../../../../title-icon/TitleIcon";
import MiniCart from "../../../../../mini-cart/MiniCart";

const CartTitleIcon = () => {
    return (
        <div>
            <ContainedPopup
                element={
                    <TitleIcon icon={'/icons/enter.png'} title={'Корзина'}/>
                }
                popup={<MiniCart/>}
                showOnClick
            />
        </div>
    );
};

export default CartTitleIcon;