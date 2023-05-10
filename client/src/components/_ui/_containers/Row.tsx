import React from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import css from './Row.module.scss';

const Row: React.FC<IDefaultComponent> = (props) => {
    return (
        <div className={[props.className, css.container].join(' ')}>
            { props.children }
        </div>
    );
};

export default Row;