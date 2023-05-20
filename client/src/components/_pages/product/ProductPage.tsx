import React from 'react';
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../../../store/products/products.api";
import ProductPageHeader from "./product-page-header/ProductPageHeader";
import ProductPageGeneralInfo from "./product-page-general-info/ProductPageGeneralInfo";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import ProductsSlider, {ProductsSliderType} from "../../_product/product-slider/ProductsSlider";
import TitledBlock from "../../titled-block/TitledBlock";

const ProductPage = () => {
    const { id } = useParams();
    const { isFetching, isError, data } = useGetProductByIdQuery({ id: id ?? '' });

    return (
        <Vertical offset={10}>
            {
                data ? <>
                    <ProductPageHeader categories={['Электроника', 'Безопасность', 'Замки']}/>
                    <ProductPageGeneralInfo {...data}/>
                    <TitledBlock title={'Похожие товары'}>
                        <ProductsSlider type={ProductsSliderType.PRODUCT} id={id ?? ''}/>
                        <ProductsSlider type={ProductsSliderType.BRAND} brand={data.brand.title}/>
                    </TitledBlock>
                </> : ''
            }
        </Vertical>
    );
};

export default ProductPage;