import {FC} from 'react';
import clsx from 'clsx';

type LoadingSpinnerProps = {
    variant?: 'inline' | 'full-screen'
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({variant = 'full-screen'}) => (
    <div className={clsx([
        "flex justify-center items-center",
        variant === 'inline' && "h-full w-full absolute top-0",
        variant === 'full-screen' && "h-screen"
    ])}>
        <div
            className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
            aria-label="Loading"
        />
    </div>
);

export default LoadingSpinner;