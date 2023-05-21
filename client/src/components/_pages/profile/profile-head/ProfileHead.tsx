import React from 'react';
import {IUser} from "../../../../store/auth/auth.types";
import AnimatedImageContainer from "../../../_ui/_images/animated-image-container/AnimatedImageContainer";
import Row from "../../../_ui/_containers/row/Row";

const ProfileHead: React.FC<IUser> = (props) => {
    return (
        <Row offset={10}>
            <AnimatedImageContainer src={props.avatar ?? ''} w={300} h={300} seconds={20}/>
            <h1>{ props.email }</h1>
        </Row>
    );
};

export default ProfileHead;