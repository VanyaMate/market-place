import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class UserLoginDto {

    @IsEmail({}, { message: 'Неверно введена почта' })
    readonly email;

    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @Length(10, 30, { message: 'Длина пароля может составлять от 10 до 30 символов' })
    readonly password;

}