import React from 'react';
import CategoryPath from "../../../category-path/CategoryPath";

export interface IProductPageHeader {
    categories: string[]
}

const ProductPageHeader: React.FC<IProductPageHeader> = (props) => {
    return (
        <div>
            <CategoryPath categories={props.categories}/>
        </div>
    );
};

export default ProductPageHeader;