import {Beer} from '../../../types/Beer';
import {APP_CONFIG} from '../../../config/appConfig';
import {enrichBeerData} from '../../../utils/enrichBeerData';

export const fetchAndEnrichBeerDetails = async (id: string): Promise<Beer> => {
    const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale/${id}`);
    const data = await response.json();

    return enrichBeerData(data);
};