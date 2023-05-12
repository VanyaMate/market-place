import React from 'react';
import ProfileTitleIcon from "./profile/ProfileTitleIcon";
import css from './ProfileMethods.module.scss';
import Row from "../../../../_ui/_containers/row/Row";

const ProfileMethods = () => {
    return (
        <Row className={css.container} offset={10}>
            <ProfileTitleIcon/>
            <ProfileTitleIcon/>
            <ProfileTitleIcon/>
            <ProfileTitleIcon/>
        </Row>
    );
};

export default ProfileMethods;