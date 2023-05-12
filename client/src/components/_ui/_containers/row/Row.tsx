import React from 'react';
import styled from 'styled-components';
import {IDefaultComponent} from "../../../../interfaces/default-component.interface";

export interface IRow extends IDefaultComponent {
    offset?: number
}

const RowContainer = styled.div`
    display: flex;
    
    & > * {
        margin-right: ${(props: { offset?: number }) => props.offset ? `${props.offset}px` : '10px'};
    }
    
    & > *:last-child {
        margin-right: 0;
    }
`

const Row: React.FC<IRow> = (props) => {
    return (
        <RowContainer {...props}/>
    );
};

export default Row;