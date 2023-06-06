export interface ICompany {
    title: string
    icon: ICompanyIcon
    description: string
    owner: string
    _id: string
    __v: number
}

export interface ICompanyIcon {
    _id: string
    type: string
    path: string
}