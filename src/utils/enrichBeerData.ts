import {Beer, BeerEnhancedData, BeerWithSales} from '../types/Beer';
import {beerStyles, breweries} from '../features/beerCatalog/store/beerCatalogStore';

const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const generateMockDetails = (): string => {
    const flavors = ['hoppy', 'malty', 'citrusy', 'floral', 'spicy', 'fruity', 'roasty', 'smooth', 'crisp', 'rich'];
    const descriptors = ['balanced', 'bold', 'complex', 'refreshing', 'full-bodied', 'light', 'sessionable', 'intense'];

    return `A ${getRandomElement(descriptors)} beer with ${getRandomElement(flavors)} notes. ${getRandomElement(descriptors)} finish.`;
};

export const enrichBeerData = (beer: Beer): BeerEnhancedData => ({
    ...beer,
    style: getRandomElement(beerStyles),
    abv: parseFloat((Math.random() * 10 + 3).toFixed(1)),
    brand: getRandomElement(breweries),
    details: generateMockDetails(),
});

export function isEnhancedBeer(beer: Beer | BeerEnhancedData | BeerWithSales): beer is BeerEnhancedData {
    return 'style' in beer && 'abv' in beer && 'brand' in beer && 'details' in beer;
}

export function isBeerWithSales(beer: Beer | BeerEnhancedData | BeerWithSales): beer is BeerWithSales {
    return 'salesCount' in beer && !('style' in beer);
}