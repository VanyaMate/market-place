import React from 'react';
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../../../store/products/products.api";
import ProductPageHeader from "./product-page-header/ProductPageHeader";
import ProductPageGeneralInfo from "./product-page-general-info/ProductPageGeneralInfo";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import ProductSlider from "../../product-slider/ProductSlider";
import TitledBlock from "../../titled-block/TitledBlock";

const ProductPage = () => {
    const { id } = useParams();
    const { isFetching, isError, data } = useGetProductByIdQuery({ id: id ?? '' });

    return (
        <Vertical offset={10}>
            <ProductPageHeader categories={['Электроника', 'Безопасность', 'Замки']}/>
            { data ? <ProductPageGeneralInfo {...data}/> : '' }
            <TitledBlock title={'Похожие товары'}>
                <ProductSlider/>
                <ProductSlider/>
            </TitledBlock>

        </Vertical>
    );
};

export default ProductPage;