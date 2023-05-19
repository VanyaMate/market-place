import React from 'react';
import {Link, LinkProps} from "react-router-dom";
import css from './DefaultLink.module.scss';

const DefaultLink: React.FC<LinkProps & React.RefAttributes<HTMLAnchorElement>> = (props) => {
    const { className, ...other } = props;
    return (
        <Link {...other} className={[css.container, className].join(' ')}/>
    );
};

export default DefaultLink;