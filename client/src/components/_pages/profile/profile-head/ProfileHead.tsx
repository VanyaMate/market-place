import React from 'react';
import {IUser} from "../../../../store/auth/auth.types";
import AnimatedImageContainer from "../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import Row from "../../../_ui/_containers/row/Row";
import MiniCart from "../../../_cart/mini-cart/MiniCart";
import css from './ProfileHead.module.scss';
import TitledBlock from "../../../titled-block/TitledBlock";

const ProfileHead: React.FC<IUser> = (props) => {
    return (
        <div className={css.container}>
            <Row offset={10}>
                <AnimatedImageContainer src={props.avatar ?? ''} w={300} h={300} seconds={20}/>
                <h1>{ props.email }</h1>
            </Row>
            <TitledBlock title={'Корзина'}>
                <MiniCart/>
            </TitledBlock>
        </div>
    );
};

export default ProfileHead;