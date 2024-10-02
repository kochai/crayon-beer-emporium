import {FC, ReactNode} from 'react';
import {clsx} from 'clsx';

type HeaderProps = {
    text: string;
    className?: string;
    children?: ReactNode;
}

const Header: FC<HeaderProps> = ({text, className = 'flex-col', children}: HeaderProps) => {
    return (
        <header className={clsx(['flex gap-4', className])}>
            <h1 className="text-3xl font-bold underline">{text}</h1>
            {children}
        </header>
    )
}

export default Header;