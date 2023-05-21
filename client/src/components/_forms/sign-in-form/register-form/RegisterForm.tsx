import React, {useMemo} from 'react';
import {useInput} from "../../../../hooks/useInput.hook";
import {useLazyLoginQuery, useLazyRegistrationQuery} from "../../../../store/auth/auth.api";
import {useActions} from "../../../../hooks/_redux/useActions.hook";
import Vertical from "../../../_ui/_containers/vertical/Vertical";
import Input from "../../../_ui/_inputs/input/Input";
import Button from "../../../_ui/_buttons/button/Button";

const RegisterForm = () => {
    const email = useInput('')
    const password = useInput('');
    const valid = useMemo(() => {
        return !!(email.value && password.value);
    }, [email.value, password.value])
    const [dispatchRegistration, { isFetching, isError, data }] = useLazyRegistrationQuery();
    const { setUser } = useActions();

    const registration = function () {
        dispatchRegistration({ email: email.value, password: password.value})
            .then((response) => {
                if (response.data?.email) {
                    setUser(response.data);
                }
            })
    }

    return (
        <Vertical offset={5}>
            <Input inputHook={email} placeholder={'email'}/>
            <Input inputHook={password} type={'password'} placeholder={'Пароль'}/>
            <Button onClick={registration} active={valid}>Регистрация</Button>
        </Vertical>
    );
};

export default RegisterForm;