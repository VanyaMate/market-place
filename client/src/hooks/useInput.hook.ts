import {useState} from "react";

export interface IUseInput {
    value: string;
    setValue: (value: string) => void;
}

export const useInput = function (defaultValue: string): IUseInput {
    const [value, setValue] = useState<string>(defaultValue);
    return { value, setValue };
}