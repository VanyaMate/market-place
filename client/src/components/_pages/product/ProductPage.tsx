import React from 'react';
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../../../store/products/products.api";
import ProductPageHeader from "./product-page-header/ProductPageHeader";
import ProductPageGeneralInfo from "./product-page-general-info/ProductPageGeneralInfo";

const ProductPage = () => {
    const { id } = useParams();
    const { isFetching, isError, data } = useGetProductByIdQuery({ id: id ?? '' });

    return (
        <div>
            <ProductPageHeader categories={['Электроника', 'Безопасность', 'Замки']}/>
            { data ? <ProductPageGeneralInfo {...data}/> : '' }
        </div>
    );
};

export default ProductPage;