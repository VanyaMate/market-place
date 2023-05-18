import React from 'react';
import ProductSlider, {ProductSliderType} from "../../product-slider/ProductSlider";
import TitledBlock from "../../titled-block/TitledBlock";

const HomePage = () => {
    return (
        <div>
            HomePage
            <TitledBlock title={'Новинки'}>
                <ProductSlider type={ProductSliderType.ALL}/>
                <ProductSlider type={ProductSliderType.ALL}/>
            </TitledBlock>

            <TitledBlock title={'Рекомендации'}>
                <ProductSlider type={ProductSliderType.ALL}/>
            </TitledBlock>

            <TitledBlock title={'Продукты'}>
                <ProductSlider type={ProductSliderType.ALL}/>
                <ProductSlider type={ProductSliderType.ALL}/>
            </TitledBlock>
        </div>
    );
};

export default HomePage;