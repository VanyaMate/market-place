import React from 'react';
import {ICompany} from "../../../store/companies/companies.interfaces";

export interface ICompanyItemProps extends React.HTMLAttributes<HTMLDivElement> {
    company: ICompany,
}

const CompanyItem: React.FC<ICompanyItemProps> = (props) => {
    const {company, ...other} = props;

    return (
        <div {...other}>
            {
                company.title
            }
        </div>
    );
};

export default CompanyItem;