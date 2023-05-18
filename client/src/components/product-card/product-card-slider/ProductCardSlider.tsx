import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import css from './ProductCardSlider.module.scss';
import {Autoplay, HashNavigation, Navigation, Pagination} from "swiper";
import {BACKEND_HOST} from "../../../cfg/links.config";
import AnimatedImageContainer from "../../animated-image-container/AnimatedImageContainer";

export interface IProductCardSlider {
    slides: string[]
}

const ProductCardSlider: React.FC<IProductCardSlider> = (props) => {
    return (
        <Swiper
            className={css.container}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            hashNavigation={{
                watchState: true,
            }}
            grabCursor={true}
            loop
            modules={[Pagination]}
        >
            {
                props.slides.length ?
                    <>
                        {
                            props.slides.map((slide, index) => {
                                return <SwiperSlide className={css.slide} key={index}>
                                    <AnimatedImageContainer
                                        src={BACKEND_HOST + '/' + slide}
                                        w={240}
                                        h={240}
                                    />
                                </SwiperSlide>
                            })
                        }
                    </> :
                    <SwiperSlide className={[css.slide, css.empty].join(' ')}/>
            }
        </Swiper>
    );
};

export default ProductCardSlider;