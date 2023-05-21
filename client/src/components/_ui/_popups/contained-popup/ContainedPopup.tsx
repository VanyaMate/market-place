import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import {JSX} from "react";
import css from './ContainedPopup.module.scss';
import styled from "styled-components";
import {useMySelector} from "../../../../hooks/_redux/useMySelector.hook";
import {useActions} from "../../../../hooks/_redux/useActions.hook";

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
    const global = useMySelector((state) => state.global);
    const { globalReset } = useActions();
    const showOnClick = function (e: BaseSyntheticEvent) {
        if (props.showOnClick) {
            !showed && globalReset();
            setTimeout(() => {
                setShowed((prev) => !prev);
            })
        }
    }

    useEffect(() => {
        setShowed(false);
    }, [global.resetValue])

    return (
        <StyledContainerPopup
            showOnHover={!!props.showOnHover}
            className={[css.container, showed ? css.showed : ''].join(' ')}
        >
            <div onClick={showOnClick}>
                { props.element }
            </div>

            <div className={'popup'}>
                { props.popup }
            </div>

        </StyledContainerPopup>
    );
};

export default ContainedPopup;