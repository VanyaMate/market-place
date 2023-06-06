import React from 'react';
import CreateCompanyForm from "../../_forms/create-company-form/CreateCompanyForm";
import CompanyList from "../../_companies/company-list/CompanyList";
import {useGetMyCompaniesQuery} from "../../../store/companies/companies.api";
import TitledBlock from "../../titled-block/TitledBlock";

const MyCompanyPage = () => {
    const {isFetching, isError, data} = useGetMyCompaniesQuery();

    return (
        <div>
            <CreateCompanyForm/>
            ----
            <TitledBlock title={'Мои компании'}>
                <CompanyList list={data ?? []}/>
            </TitledBlock>

            <TitledBlock title={'Мои бренды'}>
            </TitledBlock>

            <TitledBlock title={'Мои продукты'}>
            </TitledBlock>

            <TitledBlock title={'Статистика'}>
            </TitledBlock>
        </div>
    );
};

export default MyCompanyPage;