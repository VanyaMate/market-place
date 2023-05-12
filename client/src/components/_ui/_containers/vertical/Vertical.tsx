import React from 'react';
import styled from 'styled-components';
import {IDefaultComponent} from "../../../../interfaces/default-component.interface";

export interface IVertical extends IDefaultComponent {
    offset?: number
}

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    & > * {
        margin-bottom: ${(props: { offset?: number }) => props.offset ? `${props.offset}px` : '10px'};
    }
    
    & > *:last-child {
        margin-bottom: 0;
    }
`

const Vertical: React.FC<IVertical> = (props) => {
    return (
        <VerticalContainer {...props}/>
    );
};

export default Vertical;