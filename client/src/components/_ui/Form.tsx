import React, {FormEvent} from 'react';
import {IUseFromData} from "../../hooks/useForm.hook";

export interface IForm extends React.FormHTMLAttributes<any> {
    hook: IUseFromData;
}

const Form: React.FC<IForm> = (props) => {
    return (
        <form {...props} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            props.hook.setData(data);
        }}/>
    );
};

export default Form;