import React from 'react';
import css from './ProductCard.module.scss';
import ProductCardSlider from "./product-card-slider/ProductCardSlider";
import ProductPrice from "../product-price/ProductPrice";
import DefaultLink from "../../_ui/_links/default-link/DefaultLink";
import {ROUTE_CATALOGUE, ROUTE_PRODUCT} from "../../../cfg/links.config";
import AddToCartButton from "../../_buttons/add-to-cart-button/AddToCartButton";
import {IProduct} from "../../../store/products/products.types";


const ProductCard: React.FC<IProduct> = (props) => {
    return (
        <div className={css.container}>
            <ProductCardSlider slides={[props.generalImage, ...(props.images || [])]}/>
            <div className={css.head}>
                <div className={css.article}>article: 6893890</div>
                <DefaultLink to={`${ROUTE_CATALOGUE}/?brand=${props.brand.title}`} className={css.brand}>{ props.brand.title }</DefaultLink>
            </div>
            <DefaultLink to={`${ROUTE_PRODUCT}/${ props._id }`} className={css.title}>{ props.title }</DefaultLink>
            <ProductPrice {...props} className={css.price}/>
            <AddToCartButton
                product={props}
                className={css.addToCardButton}
            >В корзину</AddToCartButton>
        </div>
    );
};

export default React.memo(ProductCard);