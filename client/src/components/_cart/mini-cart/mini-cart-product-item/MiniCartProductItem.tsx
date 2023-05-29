import React from 'react';
import css from './MiniCartProductItem.module.scss';
import {ICartItem} from "../../../../store/auth/auth.types";
import Row from "../../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import ProductPrice from "../../../_product/product-price/ProductPrice";
import Vertical from "../../../_ui/_containers/vertical/Vertical";
import {getProductImageLink, ImageLinkSize} from "../../../../utils/links.methods";
import CartItemControl from "../../cart-item-control/CartItemControl";
import PriceCurrency from "../../../_product/product-price/price-currency/PriceCurrency";
import {DiscountType, IUsePrice, usePrice} from "../../../../hooks/usePrice.hook";
import DefaultLink from "../../../_ui/_links/default-link/DefaultLink";
import {ROUTE_PRODUCT} from "../../../../cfg/links.config";

const MiniCartProductItem: React.FC<ICartItem> = (props) => {
    const price = usePrice(props.product as IUsePrice);
    return (
        <div className={css.container}>
            <Row offset={10} className={css.info}>
                <AnimatedImageContainer src={getProductImageLink(props.product.generalImage.path, ImageLinkSize.SMALL)} w={60} h={60} seconds={5} className={css.image}/>
                <Vertical offset={5}>
                    <DefaultLink to={`${ROUTE_PRODUCT}/${ props.product._id }`}>{ props.product.title }</DefaultLink>
                    <ProductPrice {...props.product}/>
                </Vertical>
            </Row>
            <Vertical offset={5} className={css.control}>
                <CartItemControl {...props}/>
                <ProductPrice
                    price={price.original * props.amount}
                    priceCurrency={props.product.priceCurrency}
                    discountType={DiscountType.FIX}
                    discount={price.discount * props.amount}
                />
            </Vertical>
        </div>
    );
};

export default React.memo(MiniCartProductItem);