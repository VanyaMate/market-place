import {IsCurrency, IsString, Length, ValidateIf} from "class-validator";
import {IsPositiveOrZero} from "../../../validators/is-positive-or-zero.validator";
import {IsProductDiscountType} from "../../../validators/is-product-discount-type.validator";

export class ProductDto {

    @Length(2, 40, { message: 'Длина имени товара может составлять от 2 до 40 символов' })
    @IsString({ message: 'Имя товара должно быть строкой' })
    readonly title: string;

    @Length(2, 240, { message: 'Описание товара может содержать от 2 до 240 символов' })
    @IsString({ message: 'Описание товара должно быть строкой' })
    readonly description: string;

    @Length(1, 40, { message: 'Имя бренда может составлять от 2 до 40 символов' })
    @IsString({ message: 'Имя бренда должно быть строкой' })
    readonly brand: string;

    @IsPositiveOrZero()
    readonly price: number;

    @IsCurrency()
    @ValidateIf((object, value) => value !== undefined)
    readonly priceCurrency?: string;

    @IsPositiveOrZero()
    @ValidateIf((object, value) => value !== undefined)
    readonly discount?: number;

    @IsProductDiscountType()
    @ValidateIf((object, value) => value !== undefined)
    readonly discountType?: string;

}