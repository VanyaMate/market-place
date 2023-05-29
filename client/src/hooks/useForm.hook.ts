import {useState} from "react";

export interface IUseFromData {
    data: FormData | null,
    setData: (data: FormData) => void,
}

export const useForm = function (): IUseFromData {
    const [data, setData] = useState<FormData | null>(null);
    return { data, setData };
}