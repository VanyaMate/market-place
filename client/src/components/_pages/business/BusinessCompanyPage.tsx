import React from 'react';
import {useParams} from "react-router-dom";
import {useGetFullDataCompanyQuery} from "../../../store/companies/companies.api";
import CompanyItem from "../../_companies/company-item/CompanyItem";
import TitledBlock from "../../titled-block/TitledBlock";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import CreateBrandForm from "../../_forms/create-brand-form/CreateBrandForm";
import {useGetBrandsByCompanyNameQuery} from "../../../store/brands/brands.api";

const BusinessCompanyPage = () => {
    const params = useParams<{ companyTitle: string }>();
    const fullDataCompany = useGetFullDataCompanyQuery({ title: params.companyTitle! });
    const brands = useGetBrandsByCompanyNameQuery({ title: params.companyTitle! });

    return (
        <Vertical offset={20}>
            { fullDataCompany.data ? <CompanyItem company={fullDataCompany.data}/> : '' }
            <TitledBlock title={'Создать бренд'}>
                <CreateBrandForm/>
            </TitledBlock>
            <TitledBlock title={'Бренды'}>
                {
                    brands.data ? brands.data.map((brand) => <div key={brand.title}>{brand.title}</div>) : ''
                }
            </TitledBlock>
        </Vertical>
    );
};

export default BusinessCompanyPage;