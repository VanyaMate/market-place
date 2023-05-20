import React from 'react';
import Currency from "../../../_product/currency/Currency";
import UserAddress from "../../../user-address/UserAddress";
import css from './HeaderTop.module.scss';
import Row from "../../../_ui/_containers/row/Row";

const HeaderTop = () => {
    return (
        <div className={css.container}>
            <Row className={css.left}>
                <Currency/>
                <UserAddress/>
            </Row>
            <div className={css.right}>

            </div>
        </div>
    );
};

export default HeaderTop;