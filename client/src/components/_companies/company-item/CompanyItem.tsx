import React from 'react';
import {ICompany} from "../../../store/companies/companies.interfaces";
import css from './CompanyItem.module.scss';
import Vertical from "../../_ui/_containers/vertical/Vertical";
import Row from "../../_ui/_containers/row/Row";
import AnimatedImageContainer from "../../_ui/_images/animated-image-container/AnimatedImageContainer";
import {getCompanyImageLink, ImageLinkSize} from "../../../utils/links.methods";

export interface ICompanyItemProps extends React.HTMLAttributes<HTMLDivElement> {
    company: ICompany,
}

const CompanyItem: React.FC<ICompanyItemProps> = (props) => {
    const {company, className, ...other} = props;

    return (
        <div {...other} className={[className, css.container].join(' ')}>
            <Row offset={10} className={css.content}>
                <AnimatedImageContainer
                    className={css.icon}
                    src={getCompanyImageLink(company.icon.path, ImageLinkSize.MEDIUM)}
                    w={100}
                    h={100}
                    seconds={5}
                />
                <Vertical offset={5}>
                    <div className={css.name}>{ company.title }</div>
                    <div className={css.description}>{ company.description }</div>
                </Vertical>
            </Row>
        </div>
    );
};

export default CompanyItem;