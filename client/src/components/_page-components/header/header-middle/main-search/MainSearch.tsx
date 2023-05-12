import React from 'react';
import {useInput} from "../../../../../hooks/useInput.hook";
import Input from "../../../../_ui/_inputs/input/Input";
import css from './MainSearch.module.scss';
import Button from "../../../../_ui/_buttons/button/Button";
import Row from "../../../../_ui/_containers/row/Row";

const MainSearch = () => {
    const search = useInput('');

    return (
        <Row className={css.container} offset={5}>
            <Input inputHook={search} placeholder={'Поиск'} className={css.input}/>
            <Button onClick={() => {}} active className={css.button}>Поиск</Button>
        </Row>
    );
};

export default MainSearch;