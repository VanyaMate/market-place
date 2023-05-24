import React from 'react';
import css from './MiniCartProductItem.module.scss';
import {ICartItem} from "../../../store/auth/auth.types";
import Row from "../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../_ui/_images/animated-image-container/AnimatedImageContainer";
import ProductPrice from "../../_product/product-price/ProductPrice";

const MiniCartProductItem: React.FC<ICartItem> = (props) => {
    return (
        <Row className={css.container} offset={5}>
            <AnimatedImageContainer src={props.product.generalImage} w={50} h={50} seconds={5}/>
            <div>
                <div>{ props.product.title }</div>
                <ProductPrice {...props.product}/>
            </div>
            <div>Controll</div>
        </Row>
    );
};

export default MiniCartProductItem;