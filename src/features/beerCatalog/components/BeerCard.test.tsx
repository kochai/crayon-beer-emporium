import {render} from '@testing-library/react';
import {vi, describe, it} from 'vitest';
import BeerCard from './BeerCard';
import {MemoryRouter} from 'react-router-dom';
import {
    assertButtonClick,
    assertLinkInDocument,
    assertTextInDocument
} from '../../../test/utils';
import {FEATURES, isFeatureEnabled} from '../../../config/featureFlags';
import {mockEnhancedBeer} from '../../../utils/enrichBeerData';

export const assertBeerCardContent = (name: string, price: string, rating: string, reviews: number) => {
    assertTextInDocument(name);
    assertTextInDocument(`Price: ${price}`);
    assertTextInDocument(rating, {exact: false});
    assertTextInDocument(`(${reviews})`);
};

export const assertEnhancedBeerCardContent = (style: string, abv: number, brand: string) => {
    assertTextInDocument(`ABV: ${abv}%`);
    assertTextInDocument(`Brand: ${brand}`);
    assertTextInDocument(`Style: ${style}`);
};

describe('BeerCard', () => {
    it('renders beer card text correctly', async () => {
        const beer = mockEnhancedBeer({
            name: 'Custom Stout',
            style: 'Stout',
            abv: 8.0,
            brand: 'Custom Brewery'
        });

        render(
            <MemoryRouter>
                <BeerCard beer={beer}/>
            </MemoryRouter>);

        assertBeerCardContent(
            beer.name,
            beer.price,
            `${beer.rating.average.toFixed(1)}`,
            beer.rating.reviews
        )

        if (isFeatureEnabled(FEATURES.DATA_ENRICHMENT)) {
            assertEnhancedBeerCardContent(beer.style!, beer.abv!, beer.brand!);
        }
    })

    it('ensures buy button is called once', async () => {
        const beer = mockEnhancedBeer();
        const onBuyButtonClick = vi.fn();

        render(
            <MemoryRouter>
                <BeerCard beer={beer} onBuy={onBuyButtonClick}/>
            </MemoryRouter>
        );

        await assertButtonClick({
            buttonText: /Buy/i,
            callback: onBuyButtonClick
        });
    })

    it('ensures details link is rendered with proper id', async () => {
        const beer = mockEnhancedBeer();

        render(
            <MemoryRouter>
                <BeerCard beer={beer}/>
            </MemoryRouter>
        );

        assertLinkInDocument({name: 'Details', href: `/beer/${beer.id}`});
    })
})