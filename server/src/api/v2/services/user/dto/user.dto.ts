import {IsEmail, IsPhoneNumber, IsString, IsStrongPassword, Length, ValidateIf} from "class-validator";

export class UserDto {

    @IsEmail({}, { message: 'Неверный email' })
    @IsString({ message: "Должно быть строкой" })
    readonly email: string;

    // @IsStrongPassword({}, { message: 'Пароль слишком простой' })
    @Length(5, 15, { message: 'Длина пароля должна составлять от 5 до 15 символов' })
    @IsString({ message: "Должно быть строкой" })
    readonly password: string;

    @Length(2, 20, { message: 'Длина имени может составлять от 2 до 20 символов' })
    @IsString({ message: "Должно быть строкой" })
    @ValidateIf((object, value) => value !== undefined)
    readonly firstName: string;

    @Length(2, 20, { message: 'Длина имени может составлять от 2 до 20 символов' })
    @IsString({ message: "Должно быть строкой" })
    @ValidateIf((object, value) => value !== undefined)
    readonly lastName: string;

    @IsPhoneNumber('RU', { message: 'Неверно введен номер телефона' })
    @IsString({ message: "Должно быть строкой" })
    @ValidateIf((object, value) => value !== undefined)
    readonly telephone: string;

}