import {
    IsPhoneNumber,
    IsString,
    Length,
    ValidateIf
} from "class-validator";
import {UserLoginDto} from "../../auth/dto/user-login.dto";

export class UserDto extends UserLoginDto {

    @Length(2, 20, { message: 'Длина имени может составлять от 2 до 20 символов' })
    @IsString({ message: 'Имя должно быть строкой' })
    @ValidateIf((object, value) => value !== undefined)
    readonly firstName?;

    @Length(2, 20, { message: 'Длина имени может составлять от 2 до 20 символов' })
    @IsString({ message: 'Имя должно быть строкой' })
    @ValidateIf((object, value) => value !== undefined)
    readonly lastName?;

    @IsPhoneNumber('RU', { message: 'Неверно введен номер телефона' })
    @ValidateIf((object, value) => value !== undefined)
    readonly telephone?;

}