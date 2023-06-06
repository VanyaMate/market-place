import React, {useEffect, useState} from 'react';
import css from './CreateCompanyForm.module.scss';
import TitledBlock from "../../titled-block/TitledBlock";
import {useInput} from "../../../hooks/useInput.hook";
import {useLazyCreateCompanyQuery, useLazyGetMyCompaniesQuery} from "../../../store/companies/companies.api";
import Input from "../../_ui/_inputs/input/Input";
import Form from "../../_ui/Form";
import {useForm} from "../../../hooks/useForm.hook";
import Button from "../../_ui/_buttons/button/Button";
import Vertical from "../../_ui/_containers/vertical/Vertical";

const CreateCompanyForm = () => {
    const companyNameInput = useInput('');
    const descriptionInput = useInput('');
    const form = useForm();
    const [dispatchCreate, {}] = useLazyCreateCompanyQuery();

    useEffect(() => {
        if (form.data) {
            dispatchCreate({formData: form.data}).then((response) => console.log(response));
        }
    }, [form.data])

    return (
        <TitledBlock title={'Создать компанию'} className={css.container}>
            <Form hook={form}>
                <Vertical offset={10}>
                    <Input
                        inputHook={companyNameInput}
                        name={'title'}
                        placeholder={'Название'}
                        className={css.input}
                    />
                    <Input
                        inputHook={descriptionInput}
                        name={'description'}
                        placeholder={'Описание'}
                        className={css.input}
                    />
                    <input type={'file'} name={'icon'}/>
                    <Button
                        onClick={() => {}}
                        active
                        className={css.create_button}
                    >Создать</Button>
                </Vertical>
            </Form>
        </TitledBlock>
    );
};

export default CreateCompanyForm;