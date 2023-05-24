import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import css from './ProductCardSlider.module.scss';
import {Pagination} from "swiper";
import AnimatedImageContainer from "../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import {getProductImageLink, ImageLinkSize} from "../../../../utils/links.methods";

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
                                        src={getProductImageLink(slide, ImageLinkSize.MEDIUM)}
                                        w={220}
                                        h={220}
                                        seconds={10}
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