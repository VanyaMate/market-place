import {ValidateBy, ValidationArguments} from "class-validator";

export function IsPositiveOrZero(): PropertyDecorator {
    return ValidateBy({
        name: 'IsPositiveOrZero',
        constraints: [],
        validator: {
            validate(value: any): boolean {
                if (typeof value === 'string') {
                    const number: number = Number(value);
                    if (number >= 0) {
                        return true;
                    }
                }

                if (typeof value === 'number' && value >= 0) {
                    return true;
                }

                return false;
            },
            defaultMessage(validationArguments?: ValidationArguments): string {
                return `Значение [${ validationArguments.constraints }] не число либо меньше 0`;
            }
        }
    })
}