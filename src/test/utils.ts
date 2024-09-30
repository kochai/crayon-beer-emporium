import {expect} from 'vitest';
import {screen, fireEvent} from '@testing-library/react';

interface AssertTextOptions {
    exact?: boolean;
    queryMethod?: 'getByText' | 'getByRole' | 'getByTestId';
}

interface AssertLinkOptions {
    name: string;
    href: string;
}

interface AssertButtonClickOptions {
    buttonText: string | RegExp;
    callback: (...args: any[]) => any;
    times?: number;
}

export const assertTextInDocument = (
    text: string,
    options: AssertTextOptions = {}
) => {
    const {exact = true, queryMethod = 'getByText'} = options;
    const element = screen[queryMethod](text, {exact});
    expect(element).toBeInTheDocument();
};

export const assertLinkInDocument = ({name, href}: AssertLinkOptions) => {
    const link = screen.getByText(name);
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', href);
};

export const assertButtonClick = async ({
                                            buttonText,
                                            callback,
                                            times = 1
                                        }: AssertButtonClickOptions) => {
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    await fireEvent.click(button);

    expect(callback).toHaveBeenCalledTimes(times);
};