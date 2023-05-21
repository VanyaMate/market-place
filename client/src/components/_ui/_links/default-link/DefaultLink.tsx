import React from 'react';
import {Link, LinkProps} from "react-router-dom";
import css from './DefaultLink.module.scss';
import {useActions} from "../../../../hooks/_redux/useActions.hook";

const DefaultLink: React.FC<LinkProps & React.RefAttributes<HTMLAnchorElement>> = (props) => {
    const { className, ...other } = props;
    const { globalReset } = useActions();
    return (
        <Link {...other} onClick={() => globalReset()} className={[css.container, className].join(' ')}/>
    );
};

export default DefaultLink;