import {ButtonHTMLAttributes, FC, ReactNode} from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    className?: string;
}

export const buttonBaseClasses = 'text-white font-bold rounded transition-colors duration-300';

export const buttonVariantClasses = {
    primary: 'bg-gray-700 hover:bg-gray-800',
    secondary: 'bg-blue-600 hover:bg-blue-700',
    danger: 'bg-red-600 hover:bg-red-700',
};

export const buttonSizeClasses = {
    small: 'py-1 px-2 text-xs',
    medium: 'py-1 px-3 text-sm',
    large: 'py-2 px-4 text-base',
};

const Button: FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'medium',
                                           fullWidth = false,
                                           className = '',
                                           ...props
                                       }) => {

    const buttonClasses = clsx(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        fullWidth && 'w-full',
        className
    );

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;