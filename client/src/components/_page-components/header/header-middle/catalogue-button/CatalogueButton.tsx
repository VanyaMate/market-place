import React from 'react';
import css from './CatalogueButton.module.scss';
import Button from "../../../../_ui/_buttons/button/Button";

const CatalogueButton = () => {
    return (
        <Button
            className={css.container}
            onClick={() => {}}
            active
        >
            Каталог
        </Button>
    );
};

export default CatalogueButton;