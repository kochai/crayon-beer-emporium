import {Beer, BeerEnhancedData} from '../../../shared/types/Beer';
import {APP_CONFIG} from '../../../config/appConfig';
import {FEATURES, isFeatureEnabled} from '../../../config/featureFlags';
import {fetchAndEnrichBeers} from './beerCatalogEnrichmentApi';

const fetchData = async (): Promise<Beer[]> => {
    const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale`);
    if (!response.ok) {
        throw new Error('Failed to fetch beers');
    }
    return response.json();
}

export const fetchBeers = async (): Promise<Beer[] | BeerEnhancedData[]> => {
    if (isFeatureEnabled(FEATURES.DATA_ENRICHMENT)) {
        return fetchAndEnrichBeers();
    }
    return fetchData();
};