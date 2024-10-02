import {Beer, BeerEnhancedData, BeerWithSales} from '../../../types/Beer';
import {APP_CONFIG} from '../../../config/appConfig';
import {enrichBeerData} from '../../../utils/enrichBeerData';

export const addSalesCount = (beers: BeerEnhancedData[]): BeerWithSales[] => {
    return beers.map(beer => ({
        ...beer,
        salesCount: Math.floor(Math.random() * 1000) + 1
    }));
};

export const fetchBeersWithSales = async (): Promise<BeerWithSales[]> => {
    try {
        const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale`);
        if (!response.ok) {
            new Error('Failed to fetch beers');
        }
        const beers: Beer[] = await response.json();
        const enhancedBeers: BeerEnhancedData[] = beers.map(enrichBeerData);

        return addSalesCount(enhancedBeers);
    } catch (error) {
        throw error;
    }
};