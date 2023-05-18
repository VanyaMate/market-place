import React from 'react';
import css from './ProductCard.module.scss';
import ProductCardSlider from "./product-card-slider/ProductCardSlider";
import Button from "../_ui/_buttons/button/Button";

export interface IProductCardData {
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
    console.log(props);
    const currency = props.priceCurrency ?? 'руб.'

    return (
        <div className={css.container}>
            <ProductCardSlider slides={[props.generalImage, ...(props.images || [])]}/>
            <div className={css.head}>
                <div className={css.article}>article: 6893890</div>
                <div className={css.brand}>{ props.brand.title }</div>
            </div>
            <div className={css.title}>{ props.title }</div>
            <div className={css.price}>{ props.price } <span>{ currency }</span></div>
            <Button
                onClick={() => {}}
                active
                className={css.addToCardButton}
            >В корзину</Button>
        </div>
    );
};

export default ProductCard;