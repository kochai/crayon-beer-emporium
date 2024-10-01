import {vi} from 'vitest';
import {Beer} from '../types/Beer';
import {beerStyles, breweries} from '../features/beerCatalog/store/beerCatalogStore';

const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const generateMockDetails = (): string => {
    const flavors = ['hoppy', 'malty', 'citrusy', 'floral', 'spicy', 'fruity', 'roasty', 'smooth', 'crisp', 'rich'];
    const descriptors = ['balanced', 'bold', 'complex', 'refreshing', 'full-bodied', 'light', 'sessionable', 'intense'];

    return `A ${getRandomElement(descriptors)} beer with ${getRandomElement(flavors)} notes. ${getRandomElement(descriptors)} finish.`;
};

export const enrichBeerData = (beer: Beer): Beer => ({
    ...beer,
    style: beer.style || getRandomElement(beerStyles),
    abv: beer.abv || parseFloat((Math.random() * 10 + 3).toFixed(1)),
    brand: beer.brand || getRandomElement(breweries),
    details: beer.details || generateMockDetails(),
});

export const mockEnhancedBeer = vi.fn((overrides: Partial<Beer> = {}): Beer => ({
    id: 1,
    name: 'Mock IPA',
    price: '$9.99',
    image: 'https://example.com/mock-ipa.jpg',
    rating: {
        average: 4.5,
        reviews: 100
    },
    style: 'IPA',
    abv: 6.5,
    brand: 'Mock Brewery',
    details: 'A delicious mock IPA with citrusy notes',
    ...overrides
}));