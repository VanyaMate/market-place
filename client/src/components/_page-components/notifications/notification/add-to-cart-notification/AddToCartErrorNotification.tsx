import React from 'react';
import {IProduct} from "../../../../../store/products/products.types";
import Row from "../../../../_ui/_containers/row/Row";
import css from "./AddToCartErrorNotification.module.scss";
import Vertical from "../../../../_ui/_containers/vertical/Vertical";
import AnimatedImageContainer from "../../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import {getProductImageLink, ImageLinkSize} from "../../../../../utils/links.methods";

export interface IAddToCartErrorNotification {
    product: IProduct
}

const AddToCartErrorNotification: React.FC<IAddToCartErrorNotification> = (props) => {
    return (
        <Row offset={10} className={css.container}>
            <AnimatedImageContainer className={css.icon} src={getProductImageLink(props.product.generalImage.path, ImageLinkSize.SMALL)} w={80} h={80} seconds={5}/>
            <Vertical offset={5}>
                <h3 className={css.title}>
                    Ошибка добавления <span>{ props.product.title }</span>
                </h3>
                <div className={css.description}>
                    Товар не был добавлен в корзину, попробуйте позже.
                </div>
            </Vertical>
        </Row>
    );
};

export default AddToCartErrorNotification;