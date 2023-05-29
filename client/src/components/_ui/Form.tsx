import React from 'react';
import {IUseFromData} from "../../hooks/useForm.hook";

export interface IForm extends React.FormHTMLAttributes<any> {
    formHook: IUseFromData;
}

const Form: React.FC<IForm> = (props) => {
    return (
        <form {...props} onSubmit={(e) => {
            e.preventDefault();
            console.log(new FormData(e.target as HTMLFormElement))
        }}/>
    );
};

export default Form;