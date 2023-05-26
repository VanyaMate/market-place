import React from 'react';
import Button, {IButton} from "../../_ui/_buttons/button/Button";
import css from './RoundedButton.module.scss';

export interface IRoundedButton extends IButton {
    icon: string;
}

const RoundedButton: React.FC<IRoundedButton> = (props) => {
    const { className, icon, ...other } = props;

    return (
        <Button {...other} className={[className, css.container].join(' ')} active={props.active}>
            <img src={props.icon} className={css.icon}/>
        </Button>
    );
};

export default RoundedButton;