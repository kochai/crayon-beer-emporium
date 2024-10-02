import {Beer, BeerEnhancedData} from '../../../shared/types/Beer';
import {create} from 'zustand';
import {APP_CONFIG} from '../../../config/appConfig';
import {isFeatureEnabled} from '../../../config/featureFlags';
import {enrichBeerData} from '../../../shared/utils/enrichBeerData';

type BeerType = Beer | BeerEnhancedData;

interface BeerDetailsState<T extends BeerType> {
    currentBeer: T | null;
    loading: boolean;
    error: string | null;
    fetchBeerById: (id: string) => Promise<void>;
    clearCurrentBeer: () => void;
    handleBuy: (beer: T) => void;
}

export const useBeerDetailsStore = create<BeerDetailsState<BeerType>>((set) => ({
    currentBeer: null,
    loading: false,
    error: null,

    fetchBeerById: async (id: string) => {
        set({loading: true, error: null, currentBeer: null});
        try {
            const response = await fetch(`${APP_CONFIG.API_URL}/beers/ale/${id}`);
            const data = await response.json();
            const enhancedBeer = isFeatureEnabled('DATA_ENRICHMENT')
                ? enrichBeerData(data)
                : data;
            set({currentBeer: enhancedBeer, loading: false});
        } catch (error) {
            set({error: 'Failed to fetch beer details', loading: false});
        }
    },

    clearCurrentBeer: () => set({currentBeer: null}),

    handleBuy: (beer) => {
        alert(`Bought beer ${beer.name} with ID: ${beer.id}`);
    },
}));