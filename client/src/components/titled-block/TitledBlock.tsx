import React from 'react';
import {IDefaultComponent} from "../../interfaces/default-component.interface";
import css from './TitledBlock.module.scss';

export interface ITitledBlock extends IDefaultComponent {
    title: string;
}

const TitledBlock: React.FC<ITitledBlock> = (props) => {
    const { title, children, className, ...other } = props;
    return (
        <div className={[className, css.container].join(' ')} {...other}>
            <h2 className={css.title}>{ title }</h2>
            <div className={css.content}>{ children }</div>
        </div>
    );
};

export default TitledBlock;