import React from 'react';
import {ProductsEntity} from "../../../../../store/products/products.types";
import Vertical from "../../../../_ui/_containers/vertical/Vertical";
import BrandWithLogo from "../../../../brand-with-logo/BrandWithLogo";
import css from './ProductPageInfo.module.scss';
import ProductPrice from "../../../../product-price/ProductPrice";
import Button from "../../../../_ui/_buttons/button/Button";

const ProductPageInfo: React.FC<ProductsEntity> = (props) => {
    return (
        <Vertical offset={10} className={css.container}>
            <BrandWithLogo {...props.brand}/>
            <h2 className={css.title}>{ props.title }</h2>
            <div className={css.description}>{ props.description }</div>
            <ProductPrice {...props} className={css.price}/>
            <Button
                onClick={() => {}}
                active
                className={css.addToCartButton}
            >
                В корзину
            </Button>
        </Vertical>
    );
};

export default ProductPageInfo;