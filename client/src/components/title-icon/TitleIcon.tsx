import React from 'react';
import {IDefaultComponent} from "../../interfaces/default-component.interface";
import css from './TitleIcon.module.scss';

export interface ITitleIcon extends IDefaultComponent {
    icon: string;
    title: string;
}

const TitleIcon: React.FC<ITitleIcon> = (props) => {
    return (
        <div className={css.container}>
            <img src={props.icon} className={css.img}/>
            <p className={css.title}>{ props.title }</p>
        </div>
    );
};

export default TitleIcon;