import {ValidateBy, ValidationArguments} from "class-validator";

export function IsProductDiscountType(): PropertyDecorator {
    return ValidateBy({
        name: 'IsProductDiscountType',
        constraints: [],
        validator: {
            validate(value: any): boolean {
                if (typeof value === 'string') {
                    if (value === 'PERCENT' || value === 'FIX') {
                        return true;
                    }
                }

                return false;
            },
            defaultMessage(validationArguments?: ValidationArguments): string {
                return `Значение [${ validationArguments.constraints }] не является типом скидки. Допустимые варианты PERCENT и FIX`;
            }
        }
    })
}