import {Beer} from '../features/beerCatalog/types/Beer';

const beerStyles = ['IPA', 'Stout', 'Lager', 'Pale Ale', 'Porter'];
const breweries = ['Hoppy Brewers', 'Malt Masters', 'Craft Kings'];

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