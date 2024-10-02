import {Beer} from '../../../shared/types/Beer';
import {APP_CONFIG} from '../../../config/appConfig';
import {FEATURES, isFeatureEnabled} from '../../../config/featureFlags';
import {fetchAndEnrichBeerDetails} from "./beerDetailsEnrichmentApi";

const fetchData = async (id: string): Promise<Beer> => {
    const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch beer with ${id}`);
    }
    return response.json();
}

export const fetchBeerById = async (id: string): Promise<Beer> => {
    if (isFeatureEnabled(FEATURES.DATA_ENRICHMENT)) {
        return fetchAndEnrichBeerDetails(id);
    }
    return fetchData(id);
};