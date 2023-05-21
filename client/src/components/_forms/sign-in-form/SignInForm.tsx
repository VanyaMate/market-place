import React, {useState} from 'react';
import LoginForm from "./login-form/LoginForm";
import RegisterForm from "./register-form/RegisterForm";

const SignInForm = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return isLogin ?
        (
            <div>
                <LoginForm/>
                <div onClick={() => setIsLogin(false)}>registration</div>
            </div>
        )
        :
        (
            <div>
                <RegisterForm/>
                <div onClick={() => setIsLogin(true)}>login</div>
            </div>
        );
};

export default SignInForm;