import React from 'react';
import css from './CategoryPath.module.scss';
import DefaultLink from "../../_ui/_links/default-link/DefaultLink";
import {ROUTE_CATALOGUE} from "../../../cfg/links.config";

export interface ICategoryPath {
    categories: string[],
}

const CategoryPath: React.FC<ICategoryPath> = (props) => {
    return (
        <div className={css.container}>
            {
                props.categories.map((category, index) => {
                    const isLast = index === props.categories.length - 1;
                    return (
                        <DefaultLink
                            key={index}
                            to={`${ROUTE_CATALOGUE}?category=${category}`}
                            className={[css.default, isLast ? css.last : ''].join(' ')}
                        >
                            {category}
                        </DefaultLink>
                    )
                })
            }
        </div>
    );
};

export default CategoryPath;