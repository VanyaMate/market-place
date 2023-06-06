import React from 'react';
import {IProduct} from "../../../../../store/products/products.types";
import Vertical from "../../../../_ui/_containers/vertical/Vertical";
import BrandWithLogo from "../../../../_brand/brand-with-logo/BrandWithLogo";
import css from './ProductPageInfo.module.scss';
import ProductPrice from "../../../../_product/product-price/ProductPrice";
import AddToCartButton from "../../../../_buttons/add-to-cart-button/AddToCartButton";

const ProductPageInfo: React.FC<IProduct> = (props) => {
    return (
        <Vertical offset={10} className={css.container}>
            <BrandWithLogo {...props.brand}/>
            <h2 className={css.title}>{ props.title }</h2>
            <div className={css.description}>{ props.description }</div>
            <ProductPrice {...props} className={css.price}/>
            <AddToCartButton
                product={props}
                className={css.addToCartButton}
            >
                В корзину
            </AddToCartButton>
        </Vertical>
    );
};

export default ProductPageInfo;