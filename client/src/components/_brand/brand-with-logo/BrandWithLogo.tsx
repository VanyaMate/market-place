import React from 'react';
import {Brand} from "../../../store/products/products.types";
import Row from "../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../_ui/_images/animated-image-container/AnimatedImageContainer";
import {BACKEND_HOST, ROUTE_CATALOGUE} from "../../../cfg/links.config";
import css from './BrandWithLogo.module.scss';
import DefaultLink from "../../_ui/_links/default-link/DefaultLink";

const BrandWithLogo: React.FC<Brand> = (props) => {
    return (
        <Row offset={10} className={css.container}>
            <AnimatedImageContainer src={BACKEND_HOST + '/' + props.image} w={30} h={30} seconds={10} className={css.logo}/>
            <DefaultLink to={ROUTE_CATALOGUE + '/?brand=' + props.title}>{ props.title }</DefaultLink>
        </Row>
    );
};

export default BrandWithLogo;