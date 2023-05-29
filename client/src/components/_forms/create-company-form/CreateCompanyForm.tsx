import React, {useState} from 'react';
import css from './CreateCompanyForm.module.scss';
import TitledBlock from "../../titled-block/TitledBlock";
import Input from "../../_ui/_inputs/input/Input";
import {useInput} from "../../../hooks/useInput.hook";
import Button from "../../_ui/_buttons/button/Button";
import ImageInput from "../../_ui/_inputs/image-input/ImageInput";
import {useImageInput} from "../../../hooks/useImageInput.hook";
import {useLazyCreateCompanyQuery} from "../../../store/companies/companies.api";
import Form from "../../_ui/Form";
import {useForm} from "../../../hooks/useForm.hook";

const CreateCompanyForm = () => {
    const companyNameInput = useInput('');
    const imagesInput = useImageInput();
    const form = useForm();
    const [dispatchCreate, {}] = useLazyCreateCompanyQuery();

    const createCompany = function () {
        const formData = new FormData();
        formData.append('title', companyNameInput.value);
        formData.append('icon', imagesInput.images[0]);
        formData.append('description', 'Any description');

        dispatchCreate(formData);
    }

    return (
        <TitledBlock title={'Создать компанию'} className={css.container}>
            <Form formHook={form}>
                <Input inputHook={companyNameInput} placeholder={'Имя компании'} name={'title'}/>
                <ImageInput imageInputHook={imagesInput}/>
                <button type={'submit'}>sub</button>
                <Button onClick={createCompany} active>Создать</Button>
            </Form>
        </TitledBlock>
    );
};

export default CreateCompanyForm;