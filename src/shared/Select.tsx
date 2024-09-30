import {FC} from 'React';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    className?: string;
}

const Select: FC<SelectProps> = ({
                                     id,
                                     label,
                                     value,
                                     onChange,
                                     options,
                                     className = 'border rounded p-1'
                                 }) => (
    <div className="flex items-center">
        <label htmlFor={id} className="mr-2">{label}</label>
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
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