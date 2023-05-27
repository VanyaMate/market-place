import React from 'react';
import Button from "../../_ui/_buttons/button/Button";
import css from './MakeOrderButton.module.scss';

const MakeOrderButton = () => {
    return (
        <Button
            onClick={() => {}}
            active
            className={css.container}
        >
            Перейти к оформлению
        </Button>
    );
};

export default MakeOrderButton;