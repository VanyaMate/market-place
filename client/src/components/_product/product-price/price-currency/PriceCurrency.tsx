import React from 'react';
import css from './PriceCurrency.module.scss';

export interface IPriceCurrency {
    price: number;
    currency: string | undefined;
}

const PriceCurrency: React.FC<IPriceCurrency> = (props) => {
    return (
        <div className={css.container}>
            { props.price }
            <span>{ props.currency ?? 'руб.'}</span>
        </div>
    );
};

export default PriceCurrency;