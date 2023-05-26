import React from 'react';
import css from './MiniCartProductItem.module.scss';
import {ICartItem} from "../../../../store/auth/auth.types";
import Row from "../../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import ProductPrice from "../../../_product/product-price/ProductPrice";
import Vertical from "../../../_ui/_containers/vertical/Vertical";
import {getProductImageLink, ImageLinkSize} from "../../../../utils/links.methods";
import CartItemControl from "../../cart-item-control/CartItemControl";

const MiniCartProductItem: React.FC<ICartItem> = (props) => {
    return (
        <div className={css.container}>
            <Row offset={10} className={css.info}>
                <AnimatedImageContainer src={getProductImageLink(props.product.generalImage, ImageLinkSize.SMALL)} w={60} h={60} seconds={5} className={css.image}/>
                <Vertical offset={5}>
                    <div>{ props.product.title }</div>
                    <ProductPrice {...props.product}/>
                </Vertical>
            </Row>
            <CartItemControl {...props}/>
        </div>
    );
};

export default React.memo(MiniCartProductItem);