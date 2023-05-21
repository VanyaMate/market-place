import React, {useMemo} from 'react';
import Input from "../../../_ui/_inputs/input/Input";
import {useInput} from "../../../../hooks/useInput.hook";
import Vertical from "../../../_ui/_containers/vertical/Vertical";
import Button from "../../../_ui/_buttons/button/Button";
import {useLazyLoginQuery} from "../../../../store/auth/auth.api";
import {useActions} from "../../../../hooks/_redux/useActions.hook";

const LoginForm = () => {
    const email = useInput('')
    const password = useInput('');
    const valid = useMemo(() => {
        return !!(email.value && password.value);
    }, [email.value, password.value])
    const [dispatchLogin, { isFetching, isError, data }] = useLazyLoginQuery();
    const { setUser } = useActions();

    const login = function () {
        dispatchLogin({ email: email.value, password: password.value})
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
            <Button onClick={login} active={valid}>Войти</Button>
        </Vertical>
    );
};

export default LoginForm;