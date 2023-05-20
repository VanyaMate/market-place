import React, {useEffect, useMemo, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ProductSlider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination'
import "swiper/css/navigation";
import ProductCard from "../product-card/ProductCard";
import {HashNavigation, Navigation, Pagination, Autoplay} from "swiper";
import {useGetNewQuery} from "../../store/compilations/compilations.api";

export enum ProductsSliderType {
    ALL,
    CATEGORY,
    BRAND,
    PRODUCT
}

export interface IProductsSlider {
    type: ProductsSliderType,
    id?: string;
    brand?: string;
    category?: string;
}

const ProductsSlider: React.FC<IProductsSlider> = (props) => {
    /**
     * TODO: Временное решение для того, чтобы каждый слайдер был уникальный и rtq делал разные запросы
     */
    const productSliderId = useMemo(() => Math.random().toString(), []);
    const {isFetching, isError, data} = useGetNewQuery({uid: productSliderId});
    const isLoading = !isError && !isFetching && !!data;

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
                isLoading ? data.map((product, index) =>
                    <SwiperSlide className={css.slide} key={index}>
                        <ProductCard {...product} article={'98209210'}/>
                    </SwiperSlide>
                ) : ''
            }
        </Swiper>
    );
};

export default React.memo(ProductsSlider);