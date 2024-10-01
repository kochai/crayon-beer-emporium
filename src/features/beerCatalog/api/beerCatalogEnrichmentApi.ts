import {Beer} from '../../../types/Beer';
import {APP_CONFIG} from '../../../config/appConfig';
import {enrichBeerData} from '../../../utils/enrichBeerData';

export const fetchAndEnrichBeers = async (): Promise<Beer[]> => {
    const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale`);
    const rawData = await response.json();

    return rawData.map(enrichBeerData);
};