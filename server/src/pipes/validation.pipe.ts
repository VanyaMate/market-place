import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from 'class-transformer';
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map((error) => ({
                field: error.property,
                value: error.value,
                messages: Object.keys(error.constraints).map((key) => error.constraints[key]),
            }))
            throw new ValidationException(messages);
        }

        return value;
    }
}