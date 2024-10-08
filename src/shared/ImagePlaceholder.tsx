import {FC, useState} from 'react';
import {clsx} from 'clsx';
import LoadingSpinner from './LoadingSpinner';

interface ImagePlaceholderProps {
    src: string;
    alt: string;
    className?: string;
    placeholderClassName?: string;
}

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({
                                                         src,
                                                         alt,
                                                         className,
                                                         placeholderClassName
                                                     }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoad(true);
    };

    if (imageError) {
        return (
            <div
                className={clsx(["w-full h-full bg-gray-200 flex items-center justify-center rounded", placeholderClassName])}
                aria-label="No image available">
                <span className="text-gray-400 text-xs text-center">No Image</span>
            </div>
        );
    }

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={clsx(["w-full h-full object-contain rounded", className])}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
            {!imageLoad && <LoadingSpinner variant='inline' />}
        </>
    );
};

export default ImagePlaceholder;