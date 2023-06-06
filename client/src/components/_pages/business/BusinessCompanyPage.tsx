import React from 'react';
import {useParams} from "react-router-dom";
import {useGetFullDataCompanyQuery} from "../../../store/companies/companies.api";
import CompanyItem from "../../_companies/company-item/CompanyItem";

const BusinessCompanyPage = () => {
    const params = useParams<{ companyTitle: string }>();
    const { isFetching, isError, data } = useGetFullDataCompanyQuery({ title: params.companyTitle! });

    return (
        <div>
            { data ? <CompanyItem company={data}/> : '' }
        </div>
    );
};

export default BusinessCompanyPage;