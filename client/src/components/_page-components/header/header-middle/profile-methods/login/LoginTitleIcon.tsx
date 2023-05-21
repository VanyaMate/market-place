import React from 'react';
import ContainedPopup from "../../../../../_ui/_popups/contained-popup/ContainedPopup";
import TitleIcon from "../../../../../title-icon/TitleIcon";
import SignInForm from "../../../../../_forms/sign-in-form/SignInForm";

const LoginTitleIcon = () => {
    return (
        <div>
            <ContainedPopup
                element={
                    <TitleIcon icon={'/icons/enter.png'} title={'Вход'}/>
                }
                popup={<SignInForm/>}
                showOnClick
            />
        </div>
    );
};

export default LoginTitleIcon;