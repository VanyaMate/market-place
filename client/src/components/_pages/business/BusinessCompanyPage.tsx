import React from 'react';
import {useParams} from "react-router-dom";
import {useGetFullDataCompanyQuery} from "../../../store/companies/companies.api";
import CompanyItem from "../../_companies/company-item/CompanyItem";
import TitledBlock from "../../titled-block/TitledBlock";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import CreateBrandForm from "../../_forms/create-brand-form/CreateBrandForm";

const BusinessCompanyPage = () => {
    const params = useParams<{ companyTitle: string }>();
    const { isFetching, isError, data } = useGetFullDataCompanyQuery({ title: params.companyTitle! });

    return (
        <Vertical offset={20}>
            { data ? <CompanyItem company={data}/> : '' }
            <TitledBlock title={'Создать бренд'}>
                <CreateBrandForm/>
            </TitledBlock>
            <TitledBlock title={'Бренды'}>

            </TitledBlock>
        </Vertical>
    );
};

export default BusinessCompanyPage;