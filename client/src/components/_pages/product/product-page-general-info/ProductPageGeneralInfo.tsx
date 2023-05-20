import React from 'react';
import css from './ProductPageGeneralInfo.module.scss';
import {ProductsEntity} from "../../../../store/products/products.types";
import ProductBigSlider from "../../../_product/product-big-slider/ProductBigSlider";
import Row from "../../../_ui/_containers/row/Row";
import ProductPageInfo from "./product-page-info/ProductPageInfo";

const ProductPageGeneralInfo: React.FC<ProductsEntity> = (props) => {
    return (
        <Row className={css.container} offset={10}>
            <ProductBigSlider slides={[props.generalImage, ...(props.images ?? []), ...(props.images ?? []), ...(props.images ?? []), ...(props.images ?? [])]}/>
            <ProductPageInfo {...props}/>
        </Row>
    );
};

export default ProductPageGeneralInfo;