import {FC} from 'react';

type HeaderProps = {
    text: string;
}

const Header: FC<HeaderProps> = ({text, children}: HeaderProps) => {
    return (
        <header className='flex flex-col gap-4'>
            <h1 className="text-3xl font-bold underline">{text}</h1>
            {children}
        </header>
    )
}

export default Header;