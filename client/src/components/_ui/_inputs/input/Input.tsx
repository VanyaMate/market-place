import React, {useState} from 'react';
import css from './Input.module.scss';
import {IUseInput} from "../../../../hooks/useInput.hook";

export interface IInput {
    placeholder?: string;
    type?: string;
    className?: string;
    inputHook: IUseInput;
}

const Input: React.FC<IInput> = (props) => {
    return (
        <input
            type={ props.type ?? "text" }
            value={props.inputHook.value}
            placeholder={props.placeholder ?? ''}
            className={[css.container, props.className ?? ''].join(' ')}
            onChange={({ target }) => props.inputHook.setValue(target.value)}
        />
    );
};

export default Input;