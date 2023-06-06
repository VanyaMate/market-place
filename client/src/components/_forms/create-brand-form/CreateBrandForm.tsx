import React, {useEffect} from 'react';
import Form from "../../_ui/Form";
import {useForm} from "../../../hooks/useForm.hook";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import Input from "../../_ui/_inputs/input/Input";
import {useInput} from "../../../hooks/useInput.hook";
import Button from "../../_ui/_buttons/button/Button";
import css from './CreateBrandForm.module.scss';
import {useLazyCreateBrandQuery} from "../../../store/brands/brands.api";

const CreateBrandForm = () => {
    const form = useForm();
    const brandTitle = useInput('');
    const brandDescription = useInput('');
    const [dispatchCreate] = useLazyCreateBrandQuery();

    useEffect(() => {
        if (form.data) {
            dispatchCreate({formData: form.data}).then((response) => console.log(response));
        }
    }, [form.data])

    return (
        <Form hook={form} className={css.container}>
            <Vertical offset={10}>
                <Input
                    inputHook={brandTitle}
                    name={'title'}
                    placeholder={'Название'}
                />
                <Input
                    inputHook={brandDescription}
                    name={'description'}
                    placeholder={'Описание'}
                />
                <input type={'file'} name={'image'}/>
                <Button
                    onClick={() => {}}
                    active
                    className={css.create_button}
                >Создать</Button>
            </Vertical>
        </Form>
    );
};

export default CreateBrandForm;