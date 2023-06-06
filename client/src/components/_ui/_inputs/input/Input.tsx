import React, {useState} from 'react';
import css from './Input.module.scss';
import {IUseInput} from "../../../../hooks/useInput.hook";
import {IDefaultComponent} from "../../../../interfaces/default-component.interface";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    inputHook: IUseInput;
}

const Input: React.FC<IInput> = (props) => {
    const { inputHook, type, onChange, className, ...other } = props;
    return (
        <input
            type={ type ?? "text" }
            value={inputHook.value}
            className={[css.container, className ?? ''].join(' ')}
            onChange={({ target }) => inputHook.setValue(target.value)}
            {...other}
        />
    );
};

export default Input;