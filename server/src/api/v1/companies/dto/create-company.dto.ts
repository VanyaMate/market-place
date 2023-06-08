import {IsString, Length} from "class-validator";

export class CreateCompanyDto {

    @Length(2, 30, { message: 'Длина названия может быть от 2 до 30 символов' })
    @IsString({ message: 'Название должно быть строкой'})
    readonly title: string;

    @Length(2, 240, { message: 'Описание может быть от 2 до 240 символов' })
    @IsString({ message: 'Описание должно быть строкой'})
    readonly description: string;

}