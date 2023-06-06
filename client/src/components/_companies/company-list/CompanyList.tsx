import React from 'react';
import {ICompany} from "../../../store/companies/companies.interfaces";
import CompanyItem from "../company-item/CompanyItem";

export interface ICompanyListProps extends React.HTMLAttributes<HTMLDivElement> {
    list: ICompany[],
}

const CompanyList: React.FC<ICompanyListProps> = (props) => {
    const {list, ...other} = props;
    return (
        <div {...other}>
            {
                list.map((company) => <CompanyItem key={company._id} company={company}/>)
            }
        </div>
    );
};

export default CompanyList;