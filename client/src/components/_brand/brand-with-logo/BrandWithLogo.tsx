import React from 'react';
import {IBrand} from "../../../store/products/products.types";
import Row from "../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../_ui/_images/animated-image-container/AnimatedImageContainer";
import {ROUTE_CATALOGUE} from "../../../cfg/links.config";
import css from './BrandWithLogo.module.scss';
import DefaultLink from "../../_ui/_links/default-link/DefaultLink";
import {getBrandImageLink, ImageLinkSize} from "../../../utils/links.methods";

const BrandWithLogo: React.FC<IBrand> = (props) => {
    console.log(props.image);
    return (
        <Row offset={10} className={css.container}>
            <AnimatedImageContainer src={getBrandImageLink(props.image.path, ImageLinkSize.SMALL)} w={30} h={30} seconds={10} className={css.logo}/>
            <DefaultLink to={ROUTE_CATALOGUE + '/?brand=' + props.title}>{ props.title }</DefaultLink>
        </Row>
    );
};

export default BrandWithLogo;