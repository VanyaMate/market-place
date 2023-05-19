import React from 'react';
import css from './ProductCard.module.scss';
import ProductCardSlider from "./product-card-slider/ProductCardSlider";
import Button from "../_ui/_buttons/button/Button";
import ProductPrice from "../product-price/ProductPrice";
import {Link} from "react-router-dom";

export interface IProductCardData {
    _id: string;
    article: string;
    generalImage: string;
    images?: string[];
    title: string;
    brand: {
        title: string;
        description: string;
        image: string;
    };
    price: number;
    priceCurrency?: string;
    discount?: number;
    discountType?: string;
}

const ProductCard: React.FC<IProductCardData> = (props) => {
    return (
        <div className={css.container}>
            <ProductCardSlider slides={[props.generalImage, ...(props.images || [])]}/>
            <div className={css.head}>
                <div className={css.article}>article: 6893890</div>
                <div className={css.brand}>{ props.brand.title }</div>
            </div>
            <Link to={`/product/${ props._id }`} className={css.title}>{ props.title }</Link>
            <ProductPrice {...props}/>
            <Button
                onClick={() => {}}
                active
                className={css.addToCardButton}
            >В корзину</Button>
        </div>
    );
};

export default React.memo(ProductCard);