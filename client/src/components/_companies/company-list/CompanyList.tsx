import React from 'react';
import {ICompany} from "../../../store/companies/companies.interfaces";
import CompanyItem from "../company-item/CompanyItem";
import Vertical from "../../_ui/_containers/vertical/Vertical";

export interface ICompanyListProps extends React.HTMLAttributes<HTMLDivElement> {
    list: ICompany[],
}

const CompanyList: React.FC<ICompanyListProps> = (props) => {
    const {list, ...other} = props;
    return (
        <Vertical offset={10} {...other}>
            {
                list.map((company) => <CompanyItem key={company._id} company={company}/>)
            }
        </Vertical>
    );
};

export default CompanyList;