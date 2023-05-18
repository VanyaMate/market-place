import React, {useEffect, useMemo, useState} from 'react';
import {IDefaultComponent} from "../../interfaces/default-component.interface";
import styled, {keyframes, css as s_css} from "styled-components";
import css from './AnimatedImageContainer.module.scss';

// Как говорится. Работает. Не трогай.

export interface IAnimatedImageContainer extends IDefaultComponent {
    src: string;
    w: number;
    h: number;
}

const StyledContainer = styled.div`
    width: ${(props: IAnimatedImageContainer) => props.w + 'px'};
    height: ${(props: IAnimatedImageContainer) => props.h + 'px'};
    overflow: hidden;
`;

const slideImageKeyframes = (w: number, h: number, x_coef: number, y_coef: number) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(
        ${x_coef > y_coef ? 0 : w + y_coef / x_coef * -w}px, 
        ${x_coef < y_coef ? 0 : h + x_coef / y_coef * -h}px
    );
  }
  100% {
    transform: translate(0, 0);
  }
`;

type StyleImageType = { src: string, w: number, h: number, x_coef: number, y_coef: number };

const StyledImage = styled.img`
    background: url(${(props: StyleImageType) => props.src});
    animation: ${(props: StyleImageType) => slideImageKeyframes(props.w, props.h, props.x_coef, props.y_coef)} 10s infinite ease-in-out;
    width: ${(props: StyleImageType) => props.x_coef >= props.y_coef ? '100%' : 'auto' };
    height: ${(props: StyleImageType) => props.x_coef <= props.y_coef ? '100%' : 'auto' };
`;

const AnimatedImageContainer: React.FC<IAnimatedImageContainer> = (props) => {
    const [updater, setUpdater] = useState<number>(0);
    const [image, setImage] = useState<HTMLImageElement>(new Image());

    useEffect(() => {
        const updateMethod = () => setUpdater(Math.random());
        image.src = props.src;
        image.addEventListener('load', updateMethod);
        return () => {
            image.removeEventListener('load', updateMethod);
        }
    }, [])

    const [x_coef, y_coef] = useMemo(() => {
        return [
            props.w / image.width,
            props.h / image.height,
        ]
    }, [updater])

    return (
        <StyledContainer {...props} className={css.container}>
            <StyledImage src={props.src} w={props.w} h={props.h} x_coef={x_coef} y_coef={y_coef}/>
        </StyledContainer>
    );
};

export default AnimatedImageContainer;