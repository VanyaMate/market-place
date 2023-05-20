import React from 'react';
import TitleIcon from "../../../../../title-icon/TitleIcon";
import ContainedPopup from "../../../../../_ui/_popups/contained-popup/ContainedPopup";
import ProfileShortMenu from "../../../../../profile-short-menu/ProfileShortMenu";

const ProfileTitleIcon = () => {
    return (
        <div>
            <ContainedPopup
                element={
                    <TitleIcon
                        icon={'/icons/editing.png'}
                        title={'Иван'}
                    />
                }
                popup={
                    <ProfileShortMenu/>
                }
                showOnClick
            />
        </div>
    );
};

export default ProfileTitleIcon;