import {FC, InputHTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface InputWithLabelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    onChange: (value: string) => void;
    wrapperClassName?: string;
    labelClassName?: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
                                                     id,
                                                     label,
                                                     type = 'text',
                                                     value,
                                                     onChange,
                                                     className = 'border rounded p-1',
                                                     wrapperClassName,
                                                     labelClassName = 'mb-1 text-sm font-medium text-gray-700',
                                                     ...props
                                                 }) => (
    <div className={clsx(['flex flex-col', wrapperClassName])}>
        <label htmlFor={id} className={labelClassName}>
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
            aria-label={label}
            {...props}
        />
    </div>
);

export default InputWithLabel;