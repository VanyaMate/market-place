import React, {useState} from 'react';
import css from './Input.module.scss';
import {IUseInput} from "../../../../hooks/useInput.hook";
import {IDefaultComponent} from "../../../../interfaces/default-component.interface";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
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
            onKeyDown={props.onKeyDown}
        />
    );
};

export default Input;