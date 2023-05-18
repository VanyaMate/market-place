import React from 'react';
import {IDefaultComponent} from "../../interfaces/default-component.interface";
import styled from "styled-components";
import css from './AnimatedImageContainer.module.scss';

export interface IAnimatedImageContainer extends IDefaultComponent {
    src: string;
    w: number;
    h: number;
}

const StyledContainer = styled.div`
    background-image:url(${(props: IAnimatedImageContainer) => props.src});
    background-size: cover;
    width: ${(props: IAnimatedImageContainer) => props.w + 'px'};
    height: ${(props: IAnimatedImageContainer) => props.h + 'px'};
    overflow: hidden;
`;

const AnimatedImageContainer: React.FC<IAnimatedImageContainer> = (props) => {
    return (
        <StyledContainer {...props} className={css.container}/>
    );
};

export default AnimatedImageContainer;