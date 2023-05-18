import {IsString, Length} from "class-validator";

export class BrandDto {

    @Length(1, 40, { message: 'Длина имени бренда может составлять от 2 до 40 символов' })
    @IsString({ message: 'Имя бренда должно быть строкой' })
    readonly title: string;

    @Length(2, 240, { message: 'Описание бренда может содержать от 2 до 240 символов' })
    @IsString({ message: 'Описание бренда должно быть строкой' })
    readonly description: string;

}