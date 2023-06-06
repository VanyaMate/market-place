import React, {useEffect, useState} from 'react';
import css from './CreateCompanyForm.module.scss';
import TitledBlock from "../../titled-block/TitledBlock";
import {useInput} from "../../../hooks/useInput.hook";
import {useLazyCreateCompanyQuery, useLazyGetMyCompaniesQuery} from "../../../store/companies/companies.api";
import Input from "../../_ui/_inputs/input/Input";
import Form from "../../_ui/Form";
import {useForm} from "../../../hooks/useForm.hook";
import Button from "../../_ui/_buttons/button/Button";

const CreateCompanyForm = () => {
    const companyNameInput = useInput('');
    const descriptionInput = useInput('');
    const form = useForm();
    const [dispatchCreate, {}] = useLazyCreateCompanyQuery();
    const [dispatchGetMy, {}] = useLazyGetMyCompaniesQuery();

    useEffect(() => {
        if (form.data) {
            const keys = form.data.keys();
            let current = keys.next();
            while (!!current.value) {
                console.log(current);
                current = keys.next();
            }
            dispatchCreate({formData: form.data}).then((response) => console.log(response));
        }
    }, [form.data])

    return (
        <TitledBlock title={'Создать компанию'} className={css.container}>
            <Form hook={form}>
                <Input inputHook={companyNameInput} name={'title'}/>
                <Input inputHook={descriptionInput} name={'description'}/>
                <input type={'file'} name={'icon'}/>
                <Button onClick={() => {}} active>Send</Button>
            </Form>
            <Button onClick={() => dispatchGetMy()} active>Getmy</Button>
        </TitledBlock>
    );
};

export default CreateCompanyForm;