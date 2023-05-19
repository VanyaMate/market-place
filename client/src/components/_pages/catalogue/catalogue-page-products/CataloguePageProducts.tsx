import React, {useEffect} from 'react';
import {useLazyGetProductsByQuery} from "../../../../store/products/products.api";
import {useLocation, useParams} from "react-router-dom";
import ProductCard from "../../../product-card/ProductCard";
import css from './CataloguePageProducts.module.scss';
import {useSearchParams} from "../../../../hooks/useSearchParams.hook";

const CataloguePageProducts = () => {
    const [dispatchProductsGetting, {isFetching, isError, data}] = useLazyGetProductsByQuery();
    const searchParams = useSearchParams();

    useEffect(() => {
        dispatchProductsGetting(searchParams);
    }, [searchParams])

    return (
        <div className={css.container}>
            {
                data?.products?.map((product) => {
                    return <ProductCard {...product} key={product._id} article={'83478324'}/>
                })
            }
        </div>
    );
};

export default CataloguePageProducts;