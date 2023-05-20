import React from 'react';
import ProductSlider, {ProductsSliderType} from "../../product-slider/ProductsSlider";
import TitledBlock from "../../titled-block/TitledBlock";

const HomePage = () => {
    return (
        <div>
            HomePage
            <TitledBlock title={'Новинки'}>
                <ProductSlider type={ProductsSliderType.ALL}/>
                <ProductSlider type={ProductsSliderType.ALL}/>
            </TitledBlock>

            <TitledBlock title={'Рекомендации'}>
                <ProductSlider type={ProductsSliderType.ALL}/>
            </TitledBlock>

            <TitledBlock title={'Продукты'}>
                <ProductSlider type={ProductsSliderType.ALL}/>
                <ProductSlider type={ProductsSliderType.ALL}/>
            </TitledBlock>
        </div>
    );
};

export default HomePage;