import {useEffect, useState} from "react";

export interface IUseInput {
    value: string;
    setValue: (value: string) => void;
}

export const useInput = function (defaultValue: string): IUseInput {
    const [value, setValue] = useState<string>(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    return { value, setValue };
}