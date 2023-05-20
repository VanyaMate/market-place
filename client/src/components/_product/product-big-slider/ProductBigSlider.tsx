import React, {useState} from 'react';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {FreeMode, Mousewheel, Pagination, Thumbs} from "swiper";
import AnimatedImageContainer from "../../animated-image-container/AnimatedImageContainer";
import {BACKEND_HOST} from "../../../cfg/links.config";
import css from './ProductBigSlider.module.scss';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {Swiper as SwiperClass} from "swiper/types";

export interface IProductBigSlider {
    slides: string[]
}

const ProductBigSlider: React.FC<IProductBigSlider> = (props) => {
    const [mainSwiper, setMainSwiper] = useState<SwiperClass|null>(null);

    return (
        <div className={css.container}>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                thumbs={{ swiper: mainSwiper && !mainSwiper.destroyed ? mainSwiper : null }}
                modules={[Mousewheel, Thumbs]}
                className={css.main}
                mousewheel={true}
            >
                {
                    props.slides.map((slide, index) => {
                        return <SwiperSlide key={index} className={css.slide}>
                            <AnimatedImageContainer src={BACKEND_HOST + '/' + slide} w={400} h={400} seconds={10}/>
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setMainSwiper}
                direction={'vertical'}
                slidesPerView={'auto'}
                spaceBetween={5}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                watchSlidesProgress={true}
                modules={[Mousewheel, Pagination, Thumbs]}
                className={css.second}
                mousewheel={true}
            >
                {
                    props.slides.map((slide, index) => {
                        return <SwiperSlide key={index} className={css.second_slide}>
                            <AnimatedImageContainer src={BACKEND_HOST + '/' + slide} w={95} h={95} seconds={10}/>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    );
};

export default React.memo(ProductBigSlider);