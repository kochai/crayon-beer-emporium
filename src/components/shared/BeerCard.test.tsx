import {render} from '@testing-library/react';
import {vi, describe, it} from 'vitest';
import BeerCard from './BeerCard';
import {MemoryRouter} from 'react-router-dom';
import {Beer} from '../../types/Beer';
import {
    assertButtonClick,
    assertLinkInDocument,
    assertTextInDocument
} from '../../test/utils';

const mockBeer: Beer = {
    "price": "$16.99",
    "name": "Founders All Day IPA",
    "rating": {
        "average": 4.411243509154233,
        "reviews": 453
    },
    "image": "https://www.totalwine.com/media/sys_master/twmmedia/h00/h94/11891416367134.png",
    "id": 1
}

export const assertBeerCardContent = (name: string, price: string, rating: string, reviews: number) => {
    assertTextInDocument(name);
    assertTextInDocument(`Price: ${price}`);
    assertTextInDocument(rating, {exact: false});
    assertTextInDocument(`(${reviews})`);
};

describe('BeerCard', () => {
    it('renders beer card text correctly', async () => {
        render(
            <MemoryRouter>
                <BeerCard beer={mockBeer}/>
            </MemoryRouter>);

        assertBeerCardContent(
            mockBeer.name,
            mockBeer.price,
            `${mockBeer.rating.average.toFixed(1)}`,
            mockBeer.rating.reviews
        )
    })

    it('ensures buy button is called once', async () => {
        const onBuyButtonClick = vi.fn();
        render(
            <MemoryRouter>
                <BeerCard beer={mockBeer} onBuy={onBuyButtonClick}/>
            </MemoryRouter>
        );

        await assertButtonClick({
            buttonText: /Buy/i,
            callback: onBuyButtonClick
        });
    })

    it('ensures details link is rendered with proper id', async () => {
        render(
            <MemoryRouter>
                <BeerCard beer={mockBeer}/>
            </MemoryRouter>
        );

        assertLinkInDocument({name: 'Details', href: `/beer/${mockBeer.id}`});
    })
})