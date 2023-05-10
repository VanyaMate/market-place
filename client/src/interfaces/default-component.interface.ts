import React from "react";

export interface IDefaultComponent extends React.HTMLAttributes<HTMLDivElement>{
    style?: { [key: string]: string },
    className?: string,
    children?: any,
    ref?: any
}