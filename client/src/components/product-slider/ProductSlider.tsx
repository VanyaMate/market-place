import React, {useEffect, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ProductSlider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination'
import "swiper/css/navigation";
import ProductCard from "../product-card/ProductCard";
import {HashNavigation, Navigation, Pagination, Autoplay} from "swiper";
import {useGetProductsQuery, useLazyGetProductsQuery} from "../../store/products/products.api";

export enum ProductSliderType {
    ALL,
    CATEGORY,
    BRAND,
}

export interface IProductSlider {
    type: ProductSliderType,
    category?: string,
    brand?: string,
}

const ProductSlider: React.FC<IProductSlider> = (props) => {
    const {isFetching, isError, data} = useGetProductsQuery({});
    const isLoading = !isError && !isFetching && !!data?.products;

    return (
        <Swiper
            className={css.container}
            slidesPerView={1}
            autoplay={{
                delay: 4000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true
            }}
            pagination={{
                clickable: true,
            }}
            hashNavigation={{
                watchState: true,
            }}
            navigation={true}
            allowTouchMove={false}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                868: {
                    slidesPerView: 3,
                },
                1184: {
                    slidesPerView: 4,
                },
            }}
            modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        >
            {
                isLoading ? data.products!.map((product) =>
                    <SwiperSlide className={css.slide}>
                        <ProductCard {...product} article={'asd'}/>
                    </SwiperSlide>
                ) : ''
            }
        </Swiper>
    );
};

export default ProductSlider;