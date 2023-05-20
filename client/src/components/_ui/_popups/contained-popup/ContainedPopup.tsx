import React, {useState} from 'react';
import {JSX} from "react/ts5.0";
import css from './ContainedPopup.module.scss';
import styled from "styled-components";

export interface IContainedPopup {
    element: JSX.Element,
    popup: JSX.Element,
    showOnHover?: boolean,
    showOnClick?: boolean,
}

const StyledContainerPopup = styled.div`
    ${
        (props: { showOnHover: boolean }) => 
            props.showOnHover ? 
                '&:hover > .popup { opacity: 1; padding: 10px; height: auto; }' 
                : '' 
    }
`;

const ContainedPopup: React.FC<IContainedPopup> = (props) => {
    const [showed, setShowed] = useState<boolean>(false);
    const showOnClick = function () {
        if (props.showOnClick) {
            setShowed((prev) => !prev);
        }
    }

    return (
        <StyledContainerPopup {...props} className={[css.container, showed ? css.showed : '']} onClick={showOnClick}>
            { props.element }
            <div className={'popup'}>
                { props.popup }
            </div>
        </StyledContainerPopup>
    );
};

export default ContainedPopup;