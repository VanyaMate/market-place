import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from 'class-transformer';
import {isObject, validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        /**
         *  TODO: Временный фикс для того, чтобы тут проходили только объекты.
         *  Но если value будет объектом, то это может быть не dto и будет ошибка.
         */
        if (!isObject(value)) return value;

        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map((error) => ({
                field: error.property,
                value: error.value,
                messages: Object.keys(error.constraints).map((key) => error.constraints[key]),
            }))
            throw new ValidationException({ errors: messages });
        }

        return value;
    }
}