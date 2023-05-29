import {useState} from "react";

export type SetImageMethod = (images: File[]) => void;

export interface IUseImageInputData {
    images: File[],
    setImages: SetImageMethod,
}

export const useImageInput = function (): IUseImageInputData {
    const [images, setImages] = useState<File[]>([]);
    return {
        images,
        setImages
    }
}