import React from 'react';
import {IUseImageInputData} from "../../../../hooks/useImageInput.hook";
import AnimatedImageContainer from "../../_images/animated-image-container/AnimatedImageContainer";
import css from './ImageInput.module.scss';

export interface IImageInput {
    imageInputHook: IUseImageInputData;
}

const ImageInput: React.FC<IImageInput> = (props) => {
    /**
     * TODO: Заменить картинку
     */
    const image = props.imageInputHook.images?.[0];
    const inputId = `file:${ Math.random() }`

    return (
        <div className={css.container}>
            <AnimatedImageContainer
                className={css.image}
                w={200}
                h={200}
                seconds={4}
                src={image ? URL.createObjectURL(image) : 'https://www.freightera.com/blog/wp-content/uploads/2021/10/driver-assistance-unloading-1024x922.jpg'}
            />
            <input
                className={css.input}
                id={inputId}
                type="file"
                name={'image-loader'}
                accept={'image/jpeg,image/png'}
                onChange={(e) => {
                const files = e.target.files;
                if (files?.[0]) {
                    props.imageInputHook.setImages([...files]);
                }
            }}/>
            <label className={css.label} htmlFor={inputId}>Выбрать изображение</label>
        </div>
    );
};

export default React.memo(ImageInput);