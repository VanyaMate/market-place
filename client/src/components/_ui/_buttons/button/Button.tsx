import React from 'react';
import {IDefaultComponent} from "../../../../interfaces/default-component.interface";
import css from './Button.module.scss';

export interface IButton extends IDefaultComponent {
    onClick: () => void;
    active?: boolean;
}

const Button: React.FC<IButton> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={[css.container, props.className ?? '', props.active ? css.active : ''].join(' ')}
        >{props.children}</button>
    );
};

export default Button;