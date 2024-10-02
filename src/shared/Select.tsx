import {SelectHTMLAttributes, FC} from 'react';
import {clsx} from 'clsx';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label: string;
    options: Option[];
    onChange: (value: string) => void;
    wrapperClassName?: string;
    labelClassName?: string;
}

const Select: FC<SelectProps> = ({
                                     id,
                                     label,
                                     value,
                                     onChange,
                                     options,
                                     wrapperClassName,
                                     className,
                                     ...props
                                 }) => (
    <div className={clsx(["flex sm:items-center flex-col sm:flex-row", wrapperClassName])}>
        <label htmlFor={id} className="mr-2">{label}</label>
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(['border rounded p-1 w-full sm:w-auto', className])}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default Select;