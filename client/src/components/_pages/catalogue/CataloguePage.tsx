import React, {useEffect} from 'react';
import CataloguePageFilters from "./catalogue-page-filters/CataloguePageFilters";
import CataloguePageProducts from "./catalogue-page-products/CataloguePageProducts";
import css from './CataloguePage.module.scss';

const CataloguePage = () => {
    return (
        <div className={css.container}>
            <CataloguePageFilters/>
            <CataloguePageProducts/>
        </div>
    );
};

export default CataloguePage;