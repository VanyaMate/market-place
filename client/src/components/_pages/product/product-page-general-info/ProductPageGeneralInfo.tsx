import React from 'react';
import css from './ProductPageGeneralInfo.module.scss';
import {ProductsEntity} from "../../../../store/products/products.types";
import ProductBigSlider from "../../../product-big-slider/ProductBigSlider";

const ProductPageGeneralInfo: React.FC<ProductsEntity> = (props) => {
    return (
        <div className={css.container}>
            <ProductBigSlider slides={[props.generalImage, ...(props.images ?? []), ...(props.images ?? []), ...(props.images ?? []), ...(props.images ?? [])]}/>
            // slider
            // info
        </div>
    );
};

export default ProductPageGeneralInfo;